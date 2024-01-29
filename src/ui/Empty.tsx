
interface Empty {
  resource: string | number
}

export const Empty = ({ resource }: Empty) => {
  return <p>No {resource} could be found.</p>;
}

