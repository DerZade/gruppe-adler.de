import { ARMA_EVENTS_GRUPPE_ADLER_ID, ARMA_EVENTS_URL } from '.';

export interface ArmaEvent {
    date: Date;
    title: string;
    url: string;
    attendance: [number, number];
}

/**
 * Checks wether date is considered as "in future"
 * A date is "in future", if the date is in future or the current day. Time is completely ignored
 * @param {Date} date
 * @returns {boolean}
 */
export function isInFuture (date: Date): boolean {
    const dateCopy = new Date(date.getTime());

    // set to 00:00:00 of next day
    dateCopy.setDate(dateCopy.getDate() + 1);
    dateCopy.setHours(0);
    dateCopy.setMinutes(0);
    dateCopy.setSeconds(0);
    dateCopy.setMilliseconds(0);

    return dateCopy.getTime() > (new Date()).getTime();
}

export async function fetchEvents (): Promise<ArmaEvent[]> {
    const query = `
    query GetCommunityEventsWithDetails($communityId: UUID!) {
        events(
            where: {
                community: {
                    id: { eq: $communityId }
                }
            }
            order: [
                { date: DESC } # Sort by date in descending order
            ]
        ) {
            nodes {
                id
                title
                slug
                date
                eventUsers {
                    nodes {
                        status
                    }
                }
            }
        }
    }
    `;

    const communityId = ARMA_EVENTS_GRUPPE_ADLER_ID;

    const variables = { communityId };
    try {
        const response = await fetch(ARMA_EVENTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, variables })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('Fetched events:', result);

        if (result.errors) {
            console.error(result.errors);
            throw new Error('GraphQL error occurred');
        }

        // Transform the data to fit ArmaEvent interface
        return result.data.events.nodes.map((event: any): ArmaEvent => {
            const attending = event.eventUsers.nodes.filter((user: any) => user.status === 'attending').length;
            const notSureYet = event.eventUsers.nodes.filter((user: any) => user.status === 'potentiallyAttending').length;

            return {
                date: new Date(event.date),
                title: event.title,
                url: `/events/${event.slug}`, // Construct URL using slug
                attendance: [attending, notSureYet]
            };
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}
