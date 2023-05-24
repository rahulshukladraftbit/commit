// import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
  en: {
    welcome_header: 'Welcome to',
    value_prop_1: 'Save, spend, and invest with your US dollar account.',
    swipe_cta: 'Swipe to learn more →',
    value_prop_2_header: 'Make the dollar work for you.',
    value_prop_2:
      'Fight the devaluation of the peso with your US dollar account. Send and spend with lower fees and greater rewards using your own Noba Reserve+ account and card.',
    value_prop_3_header: 'Connect with your family and friends.',
    value_prop_3:
      'Add your friends and family with easy-to-use QR codes to send and receive money instantly - anywhere, anytime.',
    value_prop_4_header: 'Invest with as little as $1.00',
    value_prop_4:
      'Invest in US stocks, ETFs, crypto, and more using Noba Reserve+ with as little as 1 dollar. Learn to manage your wealth with easy to digest educational content.',
    sign_up: 'Sign Up',
    login: 'Login',
  },
  es: {
    welcome_header: 'Bienvenido a',
    value_prop_1:
      'Ahorre, gaste e invierta con su cuenta en dólares estadounidenses.',
    swipe_cta: 'Desliza para saber más →',
    value_prop_2_header: 'Haz que el dólar trabaje para ti.',
    value_prop_2:
      'Lucha contra la devaluación del peso con tu cuenta en dólares estadounidenses. Envíe y gaste con tarifas más bajas y mayores recompensas usando su propia cuenta y tarjeta Noba Reserve+.',
    value_prop_3_header: 'Conéctate con tu familia y amigos.',
    value_prop_3:
      'Agregue a sus amigos y familiares con códigos QR fáciles de usar para enviar y recibir dinero al instante, en cualquier lugar y en cualquier momento.',
    value_prop_4_header: 'Invierte con tan solo $1.00',
    value_prop_4:
      'Invierta en acciones estadounidenses, ETF, criptomonedas y más usando Noba Reserve+ con tan solo 1 dólar. Aprenda a administrar su patrimonio con contenido educativo fácil de digerir.',
    sign_up: 'Registrarse',
    login: 'Iniciar sesión',
  },
  pb: {
    welcome_header: 'Bem-vindo ao',
    value_prop_1:
      'Economize, gaste e invista com sua conta em dólares americanos.',
    swipe_cta: 'Deslize para saber mais →',
    value_prop_2_header: 'Faça o dólar trabalhar para você.',
    value_prop_2:
      'Combata a desvalorização do peso com sua conta em dólar americano. Envie e gaste com taxas mais baixas e recompensas maiores usando sua própria conta e cartão Noba Reserve+.',
    value_prop_3_header: 'Conecte-se com sua família e amigos.',
    value_prop_3:
      'Adicione seus amigos e familiares com códigos QR fáceis de usar para enviar e receber dinheiro instantaneamente - em qualquer lugar, a qualquer hora.',
    value_prop_4_header: 'Invista com apenas $ 1,00',
    value_prop_4:
      'Invista em ações dos EUA, ETFs, criptomoedas e muito mais usando o Noba Reserve+ com apenas 1 dólar. Aprenda a gerenciar sua riqueza com conteúdo educacional fácil de digerir.',
    sign_up: 'Registar-se',
    login: 'Entrar',
  },
};

const i18n = new I18n(translations);

// TEMPORARY TO TEST LANGUAGES
//i18n.locale = Localization.locale;

i18n.enableFallback = true;

export { i18n as translate };
