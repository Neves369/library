import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TypeRootStackParamList } from './navigationTypes'

export const useTypedNavigation = () =>
	useNavigation<NavigationProp<TypeRootStackParamList>>()
