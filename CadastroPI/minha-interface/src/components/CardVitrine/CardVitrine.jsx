import './CardVitrine.css';

export default function CardVitrine({ data }) {
  return (
    <div className="vitrine-card">
      <img src={data.img} alt={data.nome} className="vitrine-card-img" />
      <h4 className="vitrine-card-nome">{data.nome}</h4>
      <div className="vitrine-card-info">
        <p>Cor: {data.cor}</p>
        <p>Porte: {data.porte}</p>
        <p>Comportamento: {data.comportamento}</p>
        <p>Idade: {data.idade}</p>
      </div>
    </div>
  );
}
