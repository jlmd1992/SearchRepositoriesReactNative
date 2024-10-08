import axios from 'axios';
import { mapToRepositoryModel } from '../mappers/RepositoryMapper';
import { Repository } from '../models/Repository';

const BASE_URL = 'https://api.github.com/search/repositories';

export const fetchRepositories = async (query: string): Promise<Repository[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        sort: 'stars',
        per_page: 20,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data.items.map(mapToRepositoryModel);
    } else {
      throw new Error(`Failed to get repositories: ${response.status} ${response.statusText}`);
    }    
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
};
