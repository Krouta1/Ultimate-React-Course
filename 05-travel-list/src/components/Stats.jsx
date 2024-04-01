/* eslint-disable react/prop-types */
const Stats = ({ items }) => {
  if (items.length === 0) {
    return <footer className='stats'>No items on your list</footer>;
  }
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentage === 100
          ? 'Congrats! You are all packed!✈️'
          : `💼You have ${totalItems} items on your list and you already packed
        ${packedItems} (${percentage}%).`}
      </em>
    </footer>
  );
};

export default Stats;
