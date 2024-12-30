import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components"
import { Alert, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}


export const LoginScreen = ({ navigation }: Props) => {

  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const { height } = useWindowDimensions();


  const onLogin = async () => {
    if(form.email.length === 0 || form.password.length === 0) {;
      return;
    };

    setIsPosting(true);
    const wasSuccessLogin = await login(form.email, form.password);
    setIsPosting(false);
    if(wasSuccessLogin) return;
    Alert.alert('Error', 'Usuário ou senha incorretos');
  }

  return (
    <Layout style={{flex: 1}}>

      <ScrollView style={{ marginHorizontal: 30 }} showsVerticalScrollIndicator={false}>

        <Layout style={{ paddingTop: height * 0.20 }}>
          <Text category="h1">Entrar</Text>
          <Text category="p2">Por favor, efetuar o login para continuar</Text>
        </Layout>


        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
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
          disabled={isPosting}
          style={{ borderRadius: 50 }}
          accessoryRight={<MyIcon white name="arrow-forward-outline" />}
           onPress={onLogin}>
            Entrar
          </Button>
        </Layout>

        {/* Space */}
        <Layout style={{ height: 40 }} />

        {/* Informação de criação de conta */}
        <Layout style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Não tem conta? </Text>
          <Text 
              onPress={() => navigation.navigate('RegisterScreen')}
               status="primary" 
               category="s1">{' '} Criar conta {' '} </Text>
        </Layout>



      </ScrollView>

    </Layout>
  )
}
