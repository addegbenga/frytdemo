import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
interface ITabsProps {
  props: any;
}

const Tabs: React.FC<ITabsProps> = ({ props }) => {
  return (
    <div className="w-full px-2 py-10 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex w-[20rem] rounded-xl ">
          {Object.keys(props)?.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full  py-2.5 text-sm font-medium text-secondary focus:outline-none ',
                  '',
                  selected ? ' text-accent-1 border-b-2 border-btn-primary' : ''
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(props).map((posts: any, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames('rounded-xl  p-3', '  focus:outline-none ')}
            >
              <ul>
                {posts?.map((post: any, idx: any) => (
                  <div key={idx}>{post.table}</div>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default Tabs;
