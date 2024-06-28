import FotoCard from './FotoCard';

export default function ({ response }) {
  return (
    <>
      <div className="fotos">
        {response === null && 'Caricando foto'}
        {response?.data?.length === 0 && 'Nessuna foto trovata.'}
        {response?.data?.length > 0 &&
          response.data.map((f) => (
            <FotoCard
              key={`foto${f.id}`}
              id={f.id}
              title={f.title}
              description={f.description}
              img={f.img}
              visible={f.visible}
              categories={f.categories.map((i) => i.name)}
            />
          ))}
      </div>
    </>
  );
}

// export default ElencoPost;
