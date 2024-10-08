import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableHighlight } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import { Repository } from '../models/Repository';

interface CardItemProps {
  repository: Repository;
  isSelected: boolean;
  onToggleSelect: (repository: Repository) => void;
  showCheckbox: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ repository, isSelected, onToggleSelect, showCheckbox }) => {
  const openRepoLink = () => {
    Linking.openURL(repository.repoUrl);
  };

  return (
    <TouchableHighlight style={styles.cardContainer} onPress={openRepoLink} underlayColor="#e0e0e0">
      <View style={styles.cardContent}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{repository.repoName}</Text>
          <Text>{repository.userName}</Text>
          <View style={styles.starInfo}>
            <Ionicons name="star" size={16} color="#e5be01" />
            <Text style={{ marginStart: 4 }}>{repository.starsCount}</Text>
          </View>
        </View>
        {showCheckbox && (
          <Checkbox style={styles.check} value={isSelected} onValueChange={() => onToggleSelect(repository)} />
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 32,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  starInfo: {
    flexDirection: 'row',
  },
  check: {
    marginRight: 16,
    padding: 4,
  },
});

export default CardItem;
