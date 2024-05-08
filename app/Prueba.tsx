import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const Prueba = () => {
    const [query, setQuery] = useState('');
    const [followUps, setFollowUps] = useState<{ id: string, name: string }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false); // Bandera para controlar si la solicitud ya se ha completado
    const pageSize = 50;

    useEffect(() => {
        const fetchData = async () => {
            if (!isFetchCompleted) { // Verifica si la solicitud ya se ha completado
                try {
                    const response = await fetch(
                        `http://localhost:3000/v1/follow-ups?page=${currentPage}&size=${pageSize}`
                    );
                    const responseData = await response.json();
                    const newFollowUps = responseData.items.map((item: any) => ({
                        id: item.id,
                        name: item.name
                    }));

                    const uniqueFollowUps = Array.from(new Set([...followUps, ...newFollowUps]));

                    setFollowUps(uniqueFollowUps);
                    setCurrentPage(prevPage => prevPage + 1);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setIsFetchCompleted(true); // Establece la bandera como true una vez completada la solicitud
                }
            }
        };

        fetchData();
    }, [currentPage, followUps, isFetchCompleted]);

    const [selected, setSelected] = useState<string>("");

    const filteredFollowUps =
        query === ''
            ? followUps
            : followUps.filter((followUp) =>
                followUp.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

// Después de la declaración del estado 'selected'
console.log("Selected:", selected);
console.log("ID del Selected:", followUps.find(followUp => followUp.name === selected)?.id);



    return (
        <div className="fixed top-16 w-72">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredFollowUps.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredFollowUps.map((followUp) => (
                                    <Combobox.Option
                                        key={followUp.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={followUp.name}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {followUp.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-indigo-600'
                                                        }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};
