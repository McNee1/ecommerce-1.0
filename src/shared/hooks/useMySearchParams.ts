import { useSearchParams } from 'react-router-dom';

const KYE_NAME = 'page';

export const useMySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasKeyName = searchParams.has(KYE_NAME);
  const pageNumberParam = Number(searchParams.get(KYE_NAME));

  return { pageNumberParam, hasKeyName, setSearchParams };
};
