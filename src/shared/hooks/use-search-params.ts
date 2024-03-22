import { useSearchParams } from 'react-router-dom';

export const useMySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasKeyName = (keyName: string) => searchParams.has(keyName);
  const getParam = (keyName: string) => searchParams.get(keyName);

  return { getParam, hasKeyName, setSearchParams };
};
