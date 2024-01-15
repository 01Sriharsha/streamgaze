type CreatorPageProps = {
  params: {
    username: string;
  };
};

export default function CreatorPage({ params }: CreatorPageProps) {
  const { username } = params;
  return <div>creator dashboard - {username}</div>;
}
