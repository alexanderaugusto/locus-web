import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api'
import {
  Header,
  Input,
  InputArea,
  InputSelect,
  StepProgress
} from '../../components'
import states from '../../constants/states'
import types from '../../constants/types'

const NewAdvertise: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState({
    title: '',
    description: '',
    street: '',
    neighborhood: '',
    city: '',
    state: 'MG',
    country: 'Brasil',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    place: '',
    animal: 'true',
    type: 'Casa',
    images: []
  })

  function onChange(type: string, value: string) {
    setData({ ...data, [type]: value })
  }

  function onChangeImages(images) {
    images = images.map(image => {
      const newImage = image
      newImage.preview = URL.createObjectURL(image)
      return image
    })
    setData({
      ...data,
      images: [...data.images, ...images]
    })
  }

  async function onSubmit() {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('street', data.street)
    formData.append('neighborhood', data.neighborhood)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('country', data.country)
    formData.append('price', data.price.replace(',', '.'))
    formData.append('bedrooms', data.bedrooms)
    formData.append('bathrooms', data.bathrooms)
    formData.append('area', data.area.replace(',', '.'))
    formData.append('place', data.place)
    formData.append('animal', data.animal)
    formData.append('type', data.type)

    data.images.forEach(image => {
      formData.append('files', image)
    })

    await api
      .post('/user/property', formData, config)
      .then(() => {
        router.push('/advertise')
      })
      .catch(err => {
        console.error(err)
      })
  }

  function step1() {
    return (
      <div className="step-1">
        <h2>
          Primeiramente, nos diga as informações que você gostaria de conter no
          seu anúncio
        </h2>

        <Input
          type="text"
          label="Título"
          placeholder="Título do anuncio..."
          value={data.title}
          onChange={e => onChange('title', e.target.value)}
        />

        <InputArea
          label="Descrição"
          placeholder="Descrição do anuncio..."
          value={data.description}
          onChange={e => onChange('description', e.target.value)}
        />
      </div>
    )
  }

  function step2() {
    return (
      <div className="step-2">
        <h2>Onde seu imóvel está localizado?</h2>

        <Input
          type="text"
          label="Rua"
          placeholder="Rua do imóvel..."
          value={data.street}
          onChange={e => onChange('street', e.target.value)}
        />

        <Input
          type="text"
          label="Bairro"
          placeholder="Bairro do imóvel..."
          value={data.neighborhood}
          onChange={e => onChange('neighborhood', e.target.value)}
        />

        <Input
          type="text"
          label="Cidade"
          placeholder="Cidade do imóvel..."
          value={data.city}
          onChange={e => onChange('city', e.target.value)}
        />

        <InputSelect
          type="text"
          label="Estado"
          placeholder="Estado do imóvel..."
          value={data.state}
          options={states}
          onChangeOption={option => onChange('state', option.value)}
        />
      </div>
    )
  }

  function step3() {
    return (
      <div className="step-3">
        <h2> Precisamos de mais algumas informações do seu imóvel</h2>

        <InputSelect
          type="text"
          label="Tipo"
          placeholder="Tipo de imóvel..."
          value={data.type}
          options={types}
          onChangeOption={option => onChange('type', option.value)}
        />

        <Input
          type="text"
          label="Quartos"
          placeholder="Quantidade de quartos..."
          value={data.bedrooms}
          onChange={e => onChange('bedrooms', e.target.value)}
        />

        <Input
          type="text"
          label="Banheiro"
          placeholder="Quantidade de banheiros..."
          value={data.bathrooms}
          onChange={e => onChange('bathrooms', e.target.value)}
        />

        <Input
          type="text"
          label="Área m²"
          placeholder="Área do imóvel..."
          value={data.area}
          onChange={e => onChange('area', e.target.value)}
        />

        <Input
          type="text"
          label="Vagas"
          placeholder="É um imóvel para quantas pessoas?"
          value={data.place}
          onChange={e => onChange('place', e.target.value)}
        />

        <InputSelect
          type="text"
          label="Animal"
          placeholder="Seu imóvel aceita animais?"
          value={data.animal}
          options={[
            {
              label: 'Sim',
              value: 'true'
            },
            {
              label: 'Não',
              value: 'false'
            }
          ]}
          onChangeOption={option => onChange('animal', option.value)}
        />
      </div>
    )
  }

  function step4() {
    return (
      <div className="step-4">
        <h2>
          Selecione algumas imagens do seu imóvel para deixa-lo mais
          apresentável
        </h2>

        <div className="images">
          {data.images.map((image, key) => {
            return (
              <img
                key={key}
                className="image-item"
                src={image.preview}
                alt="Imagem do imóvel"
              />
            )
          })}
          <Dropzone onDrop={acceptedFiles => onChangeImages(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="image-item upload-container">
                  <Icon id="icon" icon={faPlus} />
                </div>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    )
  }

  function step5() {
    return (
      <div className="step-5">
        <h2>Vamos definir um preço para seu imóvel</h2>

        <Input
          type="text"
          label="Preço"
          labelInside="R$"
          placeholder="1000,00"
          value={data.price}
          onChange={e => onChange('price', e.target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Cadastrar - Vamos cadastrar sua conta IMovel</title>
      </Head>

      <main className="new-advertise-page">
        <Header goBack />

        <div className="new-advertise">
          <h1>É rápido, simples e gratuito!</h1>

          <StepProgress
            steps={[
              {
                content: step1
              },
              {
                content: step2
              },
              {
                content: step3
              },
              {
                content: step4
              },
              {
                content: step5
              }
            ]}
            initialStep={0}
            onSubmit={onSubmit}
          />
        </div>
      </main>
    </div>
  )
}

export default NewAdvertise