import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useState } from 'react';


const people = [
  'Wade Cooper',
  'Arlene Mccoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
  'Grace Lee',
  'John Smith',
  'Emily Johnson',
  'Michael Brown',
  'Sophia Martinez',
  'Ethan Davis',
  'Emma Wilson',
  'Olivia Taylor',
  'Daniel Garcia',
  'Isabella Anderson',
  'Liam Hernandez',
  'Ava Rodriguez',
  'Noah Perez',
  'Mia Chavez',
  'James Nguyen',
  'Amelia Kim',
  'Benjamin Rivera'
];


export const List = () => {

  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
        person
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  // The scrollable element for your list
  const parentRef = React.useRef()

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: people.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 10,
  })


  return (
    <>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `200px`,
          overflow: 'auto', // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
            background: 'gray',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {people[virtualItem.index]} {/* Selecciona el nombre de la persona */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
  


}


  //  return (
  //   <div className="fixed top-16 w-72">
  //     <Combobox value={selected} onChange={setSelected}>
  //       <div className="relative mt-1">
  //         <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
  //           <Combobox.Input
  //             className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
  //             onChange={(event) => setQuery(event.target.value)}
  //           />
  //           <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
  //             <ChevronUpDownIcon
  //               className="h-5 w-5 text-gray-400"
  //               aria-hidden="true"
  //             />
  //           </Combobox.Button>
  //         </div>
  //         <Transition
  //           show={query !== ''}
  //           enter="transition ease-in duration-100"
  //           enterFrom="opacity-0"
  //           enterTo="opacity-100"
  //           leave="transition ease-out duration-75"
  //           leaveFrom="opacity-100"
  //           leaveTo="opacity-0"
  //         >
  //           {(ref) => (
  //             <Combobox.Options
  //               ref={ref}
  //               className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
  //               static
  //             >
  //               {filteredPeople.map((person, index) => (
  //                 <Combobox.Option
  //                   key={index}
  //                   value={person}
  //                   className={({ active }) =>
  //                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
  //                       active ? 'bg-teal-600 text-white' : 'text-gray-900'
  //                     }`
  //                   }
  //                 >
  //                   {({ selected, active }) => (
  //                     <>
  //                       <span
  //                         className={`block truncate ${
  //                           selected ? 'font-medium' : 'font-normal'
  //                         }`}
  //                       >
  //                         {person}
  //                       </span>
  //                       {selected ? (
  //                         <span
  //                           className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
  //                             active ? 'text-white' : 'text-teal-600'
  //                           }`}
  //                         >
  //                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
  //                         </span>
  //                       ) : null}
  //                     </>
  //                   )}
  //                 </Combobox.Option>
  //               ))}
  //             </Combobox.Options>
  //           )}
  //         </Transition>
  //       </div>
  //     </Combobox>
  //     {/* The scrollable element for your list */}
  //     <div
  //       ref={parentRef}
  //       style={{
  //         height: `400px`,
  //         overflow: 'auto', // Make it scroll!
  //       }}
  //     >
  //       {/* The large inner element to hold all of the items */}
  //       <div
  //         style={{
  //           height: `${rowVirtualizer.getTotalSize()}px`,
  //           width: '100%',
  //           position: 'relative',
  //           background: 'gray',
  //         }}
  //       >
  //         {/* Only the visible items in the virtualizer, manually positioned to be in view */}
  //         {rowVirtualizer.getVirtualItems().map((virtualItem) => (
  //           <div
  //             key={virtualItem.key}
  //             style={{
  //               position: 'absolute',
  //               top: 0,
  //               left: 0,
  //               width: '100%',
  //               height: `${virtualItem.size}px`,
  //               transform: `translateY(${virtualItem.start}px)`,
  //             }}
  //           >
  //             {people[virtualItem.index]}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  





// return (
//   <div className="fixed top-16 w-72">
//     <Combobox value={selected} onChange={setSelected}>
//       <div className="relative mt-1">
//         <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
//           <Combobox.Input
//             className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
//             displayValue={(person) => person.name}
//             onChange={(event) => setQuery(event.target.value)}
//           />
//           <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
//             <ChevronUpDownIcon
//               className="h-5 w-5 text-gray-400"
//               aria-hidden="true"
//             />
//           </Combobox.Button>
//         </div>
//         <Transition
//           as={Fragment}
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//           afterLeave={() => setQuery('')}
//         >
//           <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//             {filteredPeople.length === 0 && query !== '' ? (
//               <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
//                 Nothing found.
//               </div>
//             ) : (
//               filteredPeople.map((person) => (
//                 <Combobox.Option
//                   key={person.id}
//                   className={({ active }) =>
//                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                       active ? 'bg-teal-600 text-white' : 'text-gray-900'
//                     }`
//                   }
//                   value={person}
//                 >
//                   {({ selected, active }) => (
//                     <>
//                       <span
//                         className={`block truncate ${
//                           selected ? 'font-medium' : 'font-normal'
//                         }`}
//                       >
//                         {person.name}
//                       </span>
//                       {selected ? (
//                         <span
//                           className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
//                             active ? 'text-white' : 'text-teal-600'
//                           }`}
//                         >
//                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       ) : null}
//                     </>
//                   )}
//                 </Combobox.Option>
//               ))
//             )}
//           </Combobox.Options>
//         </Transition>
//       </div>
//     </Combobox>
//   </div>
// )