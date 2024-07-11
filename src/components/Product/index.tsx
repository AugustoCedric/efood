import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import RestaurantRatingImg from '../../assets/icons/estrela.png'
import Tag from '../../components/Tag'
import Botao from '../Button'
import ModalPoupap from '../Modal'
import {
  CardConteiner,
  CardRestaurant,
  ContainerDescritivo,
  Imagem,
  Infos,
  LineSection,
  RatingStar
} from './styles'

export type Props = {
  image: string
  infos: string[]
  title: string
  nota: number
  description: string
  to: string
  background: 'light' | 'dark'
  currentItem: {
    id: string
    foto: string
    descricao: string
    preco: number
    nome: string
    porcao?: number | string // Ajustando para aceitar número ou string
  }
  shouldTruncateDescription?: boolean
  id: string // Recebendo id como propriedade
  onButtonClick: (item: {
    id: string
    foto: string
    descricao: string
    preco: number
    nome: string
    porcao?: number | string // Ajustando para aceitar número ou string
  }) => void // Adicionando a propriedade onButtonClick
}

const Products: React.FC<Props> = ({
  image,
  infos,
  title,
  nota,
  description,
  to,
  background,
  currentItem,
  shouldTruncateDescription = false,
  id,
  onButtonClick // Recebendo onButtonClick como propriedade
}) => {
  const location = useLocation()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const buttonText = location.pathname.startsWith('/perfil')
    ? 'Adicionar ao carrinho'
    : 'Saiba mais'

  const getTruncatedDescription = (description: string) => {
    if (description && description.length > 160) {
      return description.slice(0, 160) + '...'
    }
    return description
  }

  const handleClick = () => {
    onButtonClick(currentItem)
    toggleModal()
  }

  return (
    <div className="container">
      <CardConteiner>
        <CardRestaurant>
          <Imagem style={{ backgroundImage: `url(${image})` }} />
          <Infos>
            {infos.map((info, index) => (
              <Tag key={index}>{info}</Tag>
            ))}
          </Infos>
          <ContainerDescritivo>
            <LineSection>
              <h3 className="tituloCard">{title}</h3>
              <div className="Rating">
                <h3 className="nota">{nota}</h3>
                <RatingStar
                  style={{ backgroundImage: `url(${RestaurantRatingImg})` }}
                />
              </div>
            </LineSection>
            <p>
              {shouldTruncateDescription &&
              location.pathname.startsWith(`/perfil/${id}`)
                ? getTruncatedDescription(description)
                : description}
            </p>
            {location.pathname.startsWith('/perfil') ? (
              <Botao
                type="button"
                onClick={handleClick} // Chama handleClick ao clicar no botão
                title={buttonText}
                background={background}
              >
                {buttonText}
              </Botao>
            ) : (
              <Botao
                type="link"
                to={to}
                title={buttonText}
                background={background}
              >
                {buttonText}
              </Botao>
            )}
          </ContainerDescritivo>
        </CardRestaurant>
      </CardConteiner>
      {isModalVisible && (
        <ModalPoupap
          onClose={toggleModal}
          foto={currentItem.foto}
          descricao={currentItem.descricao}
          preco={currentItem.preco}
          nome={currentItem.nome}
          // porcao={currentItem.porcao}
        />
      )}
    </div>
  )
}

export default Products
