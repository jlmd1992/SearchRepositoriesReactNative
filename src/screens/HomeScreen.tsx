import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, Button, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchContext } from '../providers/SearchContext';
import { getRepositoriesUseCase } from '../usecases/GetRepositoriesUseCase';
import CardItem from '../components/CardItem';
import { Repository } from '../models/Repository';

type RootStackParamList = {
  Home: undefined;
  SelectedScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const searchContext = useContext(SearchContext);
  const nav = useNavigation<HomeScreenNavigationProp>();

  if (!searchContext) {
    throw new Error("SearchContext must be used within a SearchProvider");
  }

  const { query, setQuery, results, setResults, loading, setLoading, selectedItems, setSelectedItems } = searchContext;
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (query.length >= 3) {
        setLoading(true);
        setErrorMessage('');
        try {
          const data = await getRepositoriesUseCase(query);
          if (data && data.length > 0) {
            setResults(data);
          } else {
            setErrorMessage('No results found. Please try another search.');
            setResults([]);
          }
        } catch (error) {
          setErrorMessage('An error occurred while fetching data. Please try again later.');
          setResults([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    nav.setOptions({
      headerRight: () =>
        selectedItems.length > 0 && (
          <Ionicons
            style={{ marginRight: 15 }}
            name="trash"
            size={25}
            color="red"
            onPress={confirmDeleteSelected}
          />
        ),
    });
  }, [selectedItems]);

  const confirmDeleteSelected = () => {
    Alert.alert(
      'Delete Selected',
      'Are you sure you want to delete the selected items?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: deleteSelectedItems,
        },
      ],
      { cancelable: true }
    );
  };

  const deleteSelectedItems = () => {
    const updatedResults = results.filter((item: Repository) => !selectedItems.includes(item));
    setResults(updatedResults);
    setSelectedItems([]);
  };

  const handleInputChange = (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      setErrorMessage('Please enter at least 3 characters.');
      setSelectedItems([]);
      setResults([]);
    } else {
      setErrorMessage('');
    }
  };

  const toggleSelectItem = (item: Repository) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleInputChange}
        placeholder="Search repositories"
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={results}
          keyExtractor={(item: Repository) => item.id.toString()}
          renderItem={({ item }) => (
            <CardItem
              repository={item}
              isSelected={selectedItems.includes(item)}
              onToggleSelect={toggleSelectItem}
              showCheckbox={true}
            />
          )}
        />
      )}
      <View style={styles.footer}>
        <Text style={styles.totalStars}>
          Total stars: {results.reduce((acc, repo) => acc + repo.starsCount, 0)}
        </Text>
        <Button title="Show selected" onPress={() => nav.navigate('SelectedScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 6,
  },
  error: {
    color: 'red',
    marginHorizontal: 10,
  },
  list: {
    paddingBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalStars: {
    fontSize: 16,
  },
});

export default HomeScreen;
