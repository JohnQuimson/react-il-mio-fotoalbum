import FotoCard from './FotoCard';

// const ElencoFoto = ({ response }) => {
//   console.log('Response in ElencoFoto: ', response);

//   const fotos = response?.data || [];
//   console.log('fotos:', fotos);

//   return (
//     <div className="fotos">
//       {fotos.map((foto) => (
//         <div className="foto">
//           <h2>{foto.title}</h2>
//         </div>
//       ))}
//     </div>
//   );
// };

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
