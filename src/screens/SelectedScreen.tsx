import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SearchContext } from '../providers/SearchContext';
import CardItem from '../components/CardItem';
import { Repository } from '../models/Repository';

const SelectedScreen: React.FC = () => {
  const context = useContext(SearchContext);

  if (!context) {
    return <View><Text>Error: SearchContext is undefined</Text></View>;
  }

  const { selectedItems } = context;

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedItems as Repository[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardItem
            repository={item}
            isSelected={selectedItems.includes(item)}
            onToggleSelect={() => {}}
            showCheckbox={false}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default SelectedScreen;
