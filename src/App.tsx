import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import SignatureCanvas from 'react-signature-canvas';
import { Mail, Heart } from 'lucide-react';

type Phase = 'initial' | 'letter' | 'invitation' | 'response';

function App() {
  const [phase, setPhase] = useState<Phase>('initial');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickAttempts, setNoClickAttempts] = useState(0);
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [letterPage, setLetterPage] = useState(1);
  const [typingText, setTypingText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hiddenButtonPosition, setHiddenButtonPosition] = useState({ x: 0, y: 0 });
  const [hiddenButtonAttempts, setHiddenButtonAttempts] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const signatureRef = useRef<SignatureCanvas>(null);

  const page1Text = `Oi cabrita, eu nunca fui de fazer essas coisas de 'gays' e, mesmo você demorando o tempo de Jesus pra responder às vezes, eu gosto de estar aqui. Por que? Eu não sei ainda, mas você mesmo sem querer me faz feliz. Bom, isso já está bem 'gay', né? Me desculpa, eu só quis dizer que você é incrível e sei que tem coisas que você passa, se não, não estaria fazendo terapia, kkkkk. Mas quero que fique boa da cuca. Talvez você duvide um pouco do que vou falar, mas você é a garota mais linda que conheço e que já conheci por muitos anos.`;

  const page2Text = `E só estou falando isso porque quero que saiba que todo dia que acordo vem aquele pensamento rápido de 'como você está?', sabe?! Eu não sei te explicar porque a gente não se viu ainda, mas em alguns momentos é como se fosse manhã de Natal, mesmo só conversando de longe... eu gosto de manhã de Natal, é tudo diferente. Já falei muito e você deve estar achando isso tudo uma besteira. Fica bem, cabrita. Antes de qualquer coisa, quero dizer que devo estar fazendo isso porque você se tornou alguém importante pra mim. 'Ah, mas a gente nem se viu'... tem razão pra caralho, mas o que eu posso fazer? Enfim, se cuida cabeçuda... ah e antes que eu me esqueça, aperta em algum botão em algum canto dessa tela.`;

  const moviePosters = [
    'https://ingresso-a.akamaihd.net/prd/img/movie/cara-de-um-focinho-de-outro/8a86d677-007f-4ae4-8d12-f61c0621e799.webp',
    'https://ingresso-a.akamaihd.net/prd/img/movie/panico-7/30da3b1d-7b38-492c-85c3-790fcb5dbb7f.webp',
    'https://ingresso-a.akamaihd.net/prd/img/movie/barba-ensopada-de-sangue/1d488004-1e31-4ba7-b7e5-e1de6f1e5b69.webp',
    'https://ingresso-a.akamaihd.net/prd/img/movie/velhos-bandidos/151d69f8-a505-4752-bbaf-21cf44d83ec1.webp',
    'https://ingresso-a.akamaihd.net/prd/img/movie/devoradores-de-estrelas/b50b2ea1-ceac-4de3-a787-aae2209181e2.webp',
    'https://ingresso-a.akamaihd.net/prd/img/movie/nuremberg/8032b08a-7446-47de-983d-14e0e84e7d9d.webp',
    'https://ingresso-a.akamaihd.net/prd/img/movie/uma-segunda-chance/3681c1f8-b70e-4f67-8aa0-8775b3a258c1.webp',
    'https://ingresso-a.akamaihd.net/prd/img/movie/super-mario-galaxy-o-filme/23fedf27-eac0-4987-8403-4a0760dc3d6f.webp',
  ];

  useEffect(() => {
    if (phase === 'letter') {
      const currentText = letterPage === 1 ? page1Text : page2Text;
      let index = 0;
      setTypingText('');
      setIsTypingComplete(false);

      const interval = setInterval(() => {
        if (index < currentText.length) {
          setTypingText((prev) => prev + currentText[index]);
          index++;
        } else {
          setIsTypingComplete(true);
          clearInterval(interval);
        }
      }, 40);

      return () => clearInterval(interval);
    }
  }, [phase, letterPage]);

  const handleNoButtonClick = () => {
    if (noClickAttempts < 3) {
      const maxX = window.innerWidth - 220;
      const maxY = window.innerHeight - 120;
      const minX = 50;
      const minY = 50;
      setNoButtonPosition({
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * (maxY - minY) + minY,
      });
      setNoClickAttempts((prev) => prev + 1);
    }
    if (noClickAttempts === 3) {
      setShowNoMessage(true);
    }
  };

  const handleHiddenButtonClick = () => {
    if (hiddenButtonAttempts < 2) {
      const maxX = window.innerWidth - 160;
      const maxY = window.innerHeight - 80;
      const minX = 50;
      const minY = 50;
      setHiddenButtonPosition({
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * (maxY - minY) + minY,
      });
      setHiddenButtonAttempts((prev) => prev + 1);
    } else {
      setPhase('invitation');
    }
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
    }, 200);
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 400);
    setPhase('response');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {phase === 'initial' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-4"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mb-8"
            >
              <div className="relative">
                <Mail size={120} className="text-rose-400" strokeWidth={1.5} />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <Heart size={32} className="text-red-500 fill-red-500" />
                </motion.div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase('letter')}
              className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg mb-4 transition-colors"
            >
              Abrir
            </motion.button>

            <motion.button
              animate={{
                x: noButtonPosition.x,
                y: noButtonPosition.y,
              }}
              transition={{ duration: 0.3 }}
              onClick={handleNoButtonClick}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-full text-sm shadow-md transition-colors"
            >
              Não quero abrir não
            </motion.button>

            {showNoMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-600 text-sm mt-4 text-center max-w-xs"
              >
                Eu gastei meu React e Tailwind nisso aqui só pra fazer algo bonitinho pra você... :(
              </motion.p>
            )}
          </motion.div>
        )}

        {phase === 'letter' && (
          <motion.div
            key="letter"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              animate={{
                opacity: letterPage === 1 ? 1 : 0,
                pointerEvents: letterPage === 1 ? 'auto' : 'none',
              }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-2xl p-6 md:p-10 max-w-2xl w-full absolute"
            >
              <div className="font-serif text-gray-800 leading-relaxed whitespace-pre-wrap">
                {typingText}
                {!isTypingComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block ml-1"
                  >
                    |
                  </motion.span>
                )}
              </div>

              {isTypingComplete && letterPage === 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  onClick={() => setLetterPage(2)}
                  className="mt-6 text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-2"
                >
                  &gt; passa pro lado
                </motion.button>
              )}
            </motion.div>

            <motion.div
              animate={{
                opacity: letterPage === 2 ? 1 : 0,
                pointerEvents: letterPage === 2 ? 'auto' : 'none',
              }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-2xl p-6 md:p-10 max-w-2xl w-full absolute"
            >
              <div className="font-serif text-gray-800 leading-relaxed whitespace-pre-wrap">
                {letterPage === 2 && typingText}
                {letterPage === 2 && !isTypingComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block ml-1"
                  >
                    |
                  </motion.span>
                )}
              </div>

              {isTypingComplete && letterPage === 2 && (
                <motion.button
                  animate={{
                    x: hiddenButtonPosition.x,
                    y: hiddenButtonPosition.y,
                  }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  onClick={handleHiddenButtonClick}
                  className="mt-6 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 text-base font-semibold"
                >
                  &gt; aqui
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}

        {phase === 'invitation' && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 py-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 px-4 leading-relaxed">
              Você aceitaria sair comigo para assistir um filme e, quem sabe depois do filme, ver o mar à noite em alguma orla perto do shopping?
            </h2>

            <div className="relative w-full max-w-6xl">
              <motion.img
                animate={{
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                src="https://i.pinimg.com/736x/5e/72/bd/5e72bd74ea81135c57d801e2a7d87f7d.jpg"
                alt="Meme 1"
                className="absolute left-0 top-0 w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-lg z-10"
              />

              <motion.img
                animate={{
                  rotate: [2, -2, 2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                src="https://i.pinimg.com/736x/2d/91/2c/2d912c4a7a3b883917c94c5f86a18c69.jpg"
                alt="Meme 2"
                className="absolute right-0 top-0 w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-lg z-10"
              />

              <div className="flex flex-wrap justify-center gap-4 px-4 md:px-24 py-8">
                {moviePosters.map((poster, index) => (
                  <motion.img
                    key={index}
                    animate={{
                      rotate: [-1, 1, -1],
                    }}
                    transition={{
                      duration: 1.5 + index * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    src={poster}
                    alt={`Filme ${index + 1}`}
                    className="w-24 h-36 md:w-32 md:h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-600 text-center mt-4 mb-2">
              entre outros filmes que estão em cartaz
            </p>
            <p className="text-gray-400 text-xs text-center mb-8">
              Por favor, eu gastei todo meu React e Tailwind fazendo isso aqui há quase 1 semana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-colors"
              >
                ( SIM EU ACEITO CARAAAALHOOO )
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-colors"
              >
                ( não, obrigado 👍🏼 )
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 'response' && (
          <motion.div
            key="response"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 py-12"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Heart size={64} className="text-red-500 fill-red-500 mx-auto mb-4" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
              Que incrível! 🎉
            </h2>

            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Assine aqui (como um contrato):
              </h3>
              <div className="border-2 border-gray-300 rounded-lg">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    className: 'w-full h-40 rounded-lg',
                  }}
                />
              </div>
              <button
                onClick={() => signatureRef.current?.clear()}
                className="mt-2 text-sm text-rose-500 hover:text-rose-600"
              >
                Limpar
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Escolha a melhor data:
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none"
              />
              <p className="text-sm text-gray-600 mt-4 text-center">
                Escolha a data e me fale, porque não fiz algo que dê para eu saber a data que escolheu kkk
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
