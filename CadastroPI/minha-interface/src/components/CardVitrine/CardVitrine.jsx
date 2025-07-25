import './CardVitrine.css';
import patinhaIcon from '../../assets/patinha.png'; // caminho da imagem da patinha

export default function CardVitrine({ data }) {
  return (
    <div className="vitrine-card">
      <img src={data.img} alt={data.nome} className="vitrine-card-img" />
      <h4 className="vitrine-card-nome">{data.nome}</h4>
      <div className="vitrine-card-info">
        <p><span className="info-label">Cor:</span> {data.cor}</p>
        <p><span className="info-label">Porte:</span> {data.porte}</p>
        <p><span className="info-label">Comportamento:</span> {data.comportamento}</p>
        <p><span className="info-label">Idade:</span> {data.idade}</p>
      </div>
      <img src={patinhaIcon} alt="Patinha" className="patinha-icon" />
    </div>
  );
}