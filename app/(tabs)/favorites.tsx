import CardProvas from '@/components/CardProvas'
import { TitleThemed } from '@/components/TitleThemed'
import {View} from 'react-native'

const favorites = () => {
  return (
    <View>
      <TitleThemed background='transparent' titulo='Provas Favoritas'></TitleThemed>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
        <CardProvas titulo='Prova de Tecnologia' descricao='Técnologo de 2024, 1° Semestre' ></CardProvas>
    </View>
  )
}


export default favorites