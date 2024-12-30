import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'
import { Alert, useWindowDimensions } from 'react-native'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { useState } from 'react'
interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuthStore();
    const [isPosting, setIsPosting] = useState(false);

    const [form, setForm] = useState({
      fullName: '',
      email: '',
      password: ''
    });
    const { height } = useWindowDimensions();
  
  
    const onRegister = async () => {
      if(form.fullName.length === 0 || form.email.length === 0 || form.password.length === 0) {;
        return;
      };
  
      setIsPosting(true);
      const wasSuccessRegister = await register(form.fullName, form.email, form.password);
      setIsPosting(false);
      if(wasSuccessRegister) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
         navigation.pop();
        return;
      };
      
    }

 return (
     <Layout style={{flex: 1}}>
 
       <ScrollView style={{ marginHorizontal: 30 }} showsVerticalScrollIndicator={false}>
 
         <Layout style={{ paddingTop: height * 0.20 }}>
           <Text category="h1">Registrar-se</Text>
           <Text category="p2">Por favor, efetuar o registro para continuar</Text>
         </Layout>
 
 
         {/* Inputs */}
         <Layout style={{ marginTop: 20 }}>
         <Input
            style={{ marginTop: 10 }}
            keyboardType="default"
            autoCapitalize="none"
            value={form.fullName}
            onChangeText={(fullName) => setForm({...form, fullName})}
            placeholder="Nome" 
            accessoryLeft={<MyIcon name="person-outline" />} />


           <Input
            style={{ marginTop: 10 }}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({...form, email})}
            placeholder="E-mail" 
            accessoryLeft={<MyIcon name="email-outline" />} />
 
 
           <Input
            style={{ marginTop: 10,}}
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={(password) => setForm({...form, password})}
            placeholder="Password" 
            accessoryLeft={ <MyIcon name="lock-outline" />} />
         </Layout>
 
         {/* Space */}
         <Layout style={{ height: 20 }} />
 
         {/* Button */}
         <Layout>
           <Button
           style={{ borderRadius: 50 }}
           disabled={isPosting}
           accessoryRight={<MyIcon white name="arrow-forward-outline" />}
            onPress={onRegister}>
             Registrar
           </Button>
         </Layout>
 
         {/* Space */}
         <Layout style={{ height: 40 }} />
 
         {/* Informação de criação de conta */}
         <Layout style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>
           <Text>Já tem conta? </Text>
           <Text 
               onPress={() => navigation.pop()}
                status="primary" 
                category="s1">{' '} Login {' '} </Text>
         </Layout>
 
 
 
       </ScrollView>
 
     </Layout>
   )
}
