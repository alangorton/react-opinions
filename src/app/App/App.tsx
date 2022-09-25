import { ReactElement, useEffect, useState } from 'react';

import { Clock } from 'src/shared/components';

import { Establishment } from 'src/shared/models/food-hygiene';
import { getRandomLunchEstablishments } from 'src/features/lunch-roulette';
import { EstablishmentList } from 'src/shared/components/EstablishmentList/EstablishmentList';

function App(): ReactElement {
    const [establishments, setEstablishments] = useState<Establishment[] | undefined>();
    const [fetchError, setFetchError] = useState<Error | undefined>();

    useEffect(() => {
        const getNearbyEstablishmentsAsync = async () => {
            try {
                setEstablishments(await getRandomLunchEstablishments());
            } catch (error) {
                console.error(error);
                setFetchError(error as Error);
            }
        }

        getNearbyEstablishmentsAsync();
    }, []);

    return (
        <>
            <Clock />
            <hr />

            {!establishments && 'Fetching...'}
            {establishments && <EstablishmentList establishments={establishments} />}

            {fetchError && fetchError.message}
        </>
    );
}

export { App };
