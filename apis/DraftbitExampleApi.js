import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const doctorsListGETStatusAndText = (Constants, { count }) =>
  fetch(`https://example-data.draftbit.com/people?_limit=${count ?? ''}`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const doctorsListGET = (Constants, { count }) =>
  doctorsListGETStatusAndText(Constants, { count }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useDoctorsListGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['doctors', args], () => doctorsListGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchDoctorsListGET = ({
  children,
  onData = () => {},
  refetchInterval,
  count,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useDoctorsListGET(
    { count },
    { refetchInterval }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchDoctorsList: refetch });
};
