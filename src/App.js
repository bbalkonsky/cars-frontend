import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import MainPage from './components/MainPage';
import Car from './components/Car';
import { Col, Row, ConfigProvider, theme, Layout, Spin, Button } from 'antd';


const tg = window.Telegram.WebApp;
const tgTheme = tg.themeParams;

function App() {
  const [showContent, setShowContent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Добавить проверку на юзернейм



    if (!tg?.initDataUnsafe?.user) {
      tg.expand()
      // setIsLoading(true);
      // setShowContent(true);
      // const chekUser = async () => {
      //   try {
      //     // const currentUser = await getUser(tg.initDataUnsafe.user.id);
      //     if (!currentUser?.length) {
      //       await createUser('sdsdfv', 'hui');
      //       // await createUser(tg.initDataUnsafe.user.id.toString(), tg.initDataUnsafe.user.username);
      //     }
      //   } catch (err) {
      //     alert('чот не вышло')
      //   }
      //   setIsLoading(false);
      // };
      // chekUser();
    }
  }, [])

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemSelectedBg: '#f5f5f5'
            }
          },
          // algorithm: theme.compactAlgorithm,
          token: {
            // Seed Token
            // colorPrimary: '#00b96b',
            // borderRadius: 2,

            // Alias Token
            // colorBgContainer: '#f6ffed',

            // colorBgLayout: tgTheme?.bg_color, // bg_color
            colorBgLayout: '#fff', // bg_color
            // colorTextBase: tgTheme?.text_color, // text_color
            // colorBgContainer: tgTheme?.secondary_bg_color, // secondary_bg_color

          },
        }}
      >
        <Layout>
          {isLoading && <Spin style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />}
          {showContent && !isLoading &&
            <Row justify="space-around">
              <Col span={23}>
                <Routes>
                  <Route path="/" element={ <MainPage /> } />
                  <Route path="/:id" element={ <Car /> } />
                </Routes>
              </Col>
            </Row>
          }
          {!showContent && <p style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Это телеграмный сайтец. Уходи.</p>}
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
