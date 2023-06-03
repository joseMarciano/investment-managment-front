import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Loader } from '../../commons/loader/Loader';
import { useApplicationContext } from '../../commons/application/context/ApplicationContext';

type StockRadarContextProps = {
    lowPricesStocks: any;
    highPricesStocks: any;
};

type StockRadarContextProviderProps = {
    children: ReactNode;
};

const StockRadarContext = createContext({} as StockRadarContextProps);

export function StockRadarContextProvider({ children }: StockRadarContextProviderProps) {
    // 'https://api.hgbrasil.com/finance/stock_price?key=05009824&symbol=get-low';
    const { http } = useApplicationContext();
    const token = useRef(process.env.REACT_APP_HG_CONSOLE_KEY);
    const baseUrl = useRef(process.env.REACT_APP_HG_CONSOLE_BASE_URL);
    const [isLoading, setIsLoading] = useState(false);
    const [lowPricesStocks, setLowPricesStocks] = useState([]);
    const [highPricesStocks, setHighPricesStocks] = useState([]);

    useEffect(() => {
        searchStockRadars();
    }, []);

    return (
        <StockRadarContext.Provider value={{ lowPricesStocks, highPricesStocks }}>
            {children}
            <Loader isLoading={isLoading} />

        </StockRadarContext.Provider>
    );

    async function searchStockRadars() {
        getStockRadars('get-high')
            .then(({ data: { results } }) => {
                setHighPricesStocks(Object.keys(results).map(buildStocksPrices(results)));
            })
            .catch((e) => console.error('Error on fetch StockRadars high', e))
            .finally(() => setIsLoading(false));

        getStockRadars('get-low')
            .then(({ data: { results } }) => {
                setLowPricesStocks(Object.keys(results).map(buildStocksPrices(results)));
            })
            .catch((e) => console.error('Error on fetch StockRadars low', e))
            .finally(() => setIsLoading(false));

    }


    async function getStockRadars(type: 'get-low' | 'get-high'): Promise<any> {
        try {
            setIsLoading(true);
            // if (type === 'get-high')
            //     return Promise.resolve({
            //         "by": "get_high_symbols",
            //         "valid_key": true,
            //         "results": {
            //             "CORR4": {
            //                 "kind": "stock",
            //                 "symbol": "CORR4",
            //                 "name": "Cor Ribeiro",
            //                 "company_name": "Correa Ribeiro S.A. Comercio E Industria",
            //                 "document": "15.101.405/0001-93",
            //                 "description": "",
            //                 "website": "http://www.crci.com.br/",
            //                 "region": "Brazil/Sao Paulo",
            //                 "currency": "BRL",
            //                 "market_time": {
            //                     "open": "10:00",
            //                     "close": "17:30",
            //                     "timezone": -3
            //                 },
            //                 "logo": null,
            //                 "market_cap": 0.0,
            //                 "price": 82.0,
            //                 "change_percent": 8224.03,
            //                 "updated_at": "2023-06-01 17:07:54"
            //             },
            //             "ESTR3": {
            //                 "kind": "stock",
            //                 "symbol": "ESTR3",
            //                 "name": "Estrela",
            //                 "company_name": "Manufatura De Brinquedos Estrela S.A.",
            //                 "document": "61.082.004/0001-50",
            //                 "description": "Fabricação de Brinquedos E Jogos Recreativos",
            //                 "website": "http://www.estrela.com.br/",
            //                 "region": "Brazil/Sao Paulo",
            //                 "currency": "BRL",
            //                 "market_time": {
            //                     "open": "10:00",
            //                     "close": "17:30",
            //                     "timezone": -3
            //                 },
            //                 "logo": null,
            //                 "market_cap": 59.62,
            //                 "price": 16.01,
            //                 "change_percent": 128.71,
            //                 "updated_at": "2023-06-01 17:07:54"
            //             },
            //             "SOND3": {
            //                 "kind": "stock",
            //                 "symbol": "SOND3",
            //                 "name": "Sondotecnica",
            //                 "company_name": "Sondotecnica Engenharia Solos S.A.",
            //                 "document": "33.386.210/0001-19",
            //                 "description": "Serviços de Engenharia.",
            //                 "website": "http://www.sondotecnica.com.br/",
            //                 "region": "Brazil/Sao Paulo",
            //                 "currency": "BRL",
            //                 "market_time": {
            //                     "open": "10:00",
            //                     "close": "17:30",
            //                     "timezone": -3
            //                 },
            //                 "logo": {
            //                     "small": "https://assets.hgbrasil.com/finance/companies/small/sondotecnica.png",
            //                     "big": "https://assets.hgbrasil.com/finance/companies/big/sondotecnica.png"
            //                 },
            //                 "market_cap": 82.32,
            //                 "price": 46.01,
            //                 "change_percent": 33.6,
            //                 "updated_at": "2023-06-01 17:07:54"
            //             },
            //             "SOND6": {
            //                 "kind": "stock",
            //                 "symbol": "SOND6",
            //                 "name": "Sondotecnica",
            //                 "company_name": "Sondotecnica Engenharia Solos S.A.",
            //                 "document": "33.386.210/0001-19",
            //                 "description": "Serviços de Engenharia.",
            //                 "website": "http://www.sondotecnica.com.br/",
            //                 "region": "Brazil/Sao Paulo",
            //                 "currency": "BRL",
            //                 "market_time": {
            //                     "open": "10:00",
            //                     "close": "17:30",
            //                     "timezone": -3
            //                 },
            //                 "logo": {
            //                     "small": "https://assets.hgbrasil.com/finance/companies/small/sondotecnica.png",
            //                     "big": "https://assets.hgbrasil.com/finance/companies/big/sondotecnica.png"
            //                 },
            //                 "market_cap": 82.32,
            //                 "price": 32.35,
            //                 "change_percent": 23.21,
            //                 "updated_at": "2023-06-01 17:07:54"
            //             },
            //             "SHOW3": {
            //                 "kind": "stock",
            //                 "symbol": "SHOW3",
            //                 "name": "Time For Fun",
            //                 "company_name": "T4 F Entretenimento S.A.",
            //                 "document": "02.860.694/0001-62",
            //                 "description": "Atuação No Setor de Entretenimento Ao Vivo. Através Da Operação de Casas de Espetáculos E de Bilheterias. Da Comercialização de Alimentos. Bebidas E Produtos Promocionais E Da Negociação de Patrocínio",
            //                 "website": "http://www.t4f.com.br/ri/",
            //                 "region": "Brazil/Sao Paulo",
            //                 "currency": "BRL",
            //                 "market_time": {
            //                     "open": "10:00",
            //                     "close": "17:30",
            //                     "timezone": -3
            //                 },
            //                 "logo": {
            //                     "small": "https://assets.hgbrasil.com/finance/companies/small/time-for-fun.png",
            //                     "big": "https://assets.hgbrasil.com/finance/companies/big/time-for-fun.png"
            //                 },
            //                 "market_cap": 175.95,
            //                 "price": 2.61,
            //                 "change_percent": 20.28,
            //                 "updated_at": "2023-06-01 17:07:54"
            //             }
            //         },
            //         "execution_time": 0.04,
            //         "from_cache": false
            //     });

            // return Promise.resolve({
            //     "by": "get_low_symbols",
            //     "valid_key": true,
            //     "results": {
            //         "PEAB4": {
            //             "kind": "stock",
            //             "symbol": "PEAB4",
            //             "name": "Par Al Bahia",
            //             "company_name": "Cia Participacoes Alianca Da Bahia",
            //             "document": "01.938.783/0001-11",
            //             "description": "Participações em Outras Sociedades. Na Qualidade de Sócia E/ou Quotista E Administração de Bnes Próprios",
            //             "website": "http://www.aliancaparticipacoes.com.br",
            //             "region": "Brazil/Sao Paulo",
            //             "currency": "BRL",
            //             "market_time": {
            //                 "open": "10:00",
            //                 "close": "17:30",
            //                 "timezone": -3
            //             },
            //             "logo": null,
            //             "market_cap": 524.35,
            //             "price": 57.01,
            //             "change_percent": -18.55,
            //             "updated_at": "2023-06-01 17:07:54"
            //         },
            //         "CSRN5": {
            //             "kind": "stock",
            //             "symbol": "CSRN5",
            //             "name": "Cosern",
            //             "company_name": "Cia Energetica Do Rio Gde Norte Cosern",
            //             "document": "08.324.196/0001-81",
            //             "description": "Serviço Público de Distribuição de Energia Elétrica",
            //             "website": "http://www.cosern.com.br/",
            //             "region": "Brazil/Sao Paulo",
            //             "currency": "BRL",
            //             "market_time": {
            //                 "open": "10:00",
            //                 "close": "17:30",
            //                 "timezone": -3
            //             },
            //             "logo": {
            //                 "small": "https://assets.hgbrasil.com/finance/companies/small/cosern.png",
            //                 "big": "https://assets.hgbrasil.com/finance/companies/big/cosern.png"
            //             },
            //             "market_cap": 3712.38,
            //             "price": 23.11,
            //             "change_percent": -10.39,
            //             "updated_at": "2023-06-01 17:07:54"
            //         },
            //         "MERC4": {
            //             "kind": "stock",
            //             "symbol": "MERC4",
            //             "name": "Merc Financ",
            //             "company_name": "Mercantil Brasil Financ S.A. C.F.I.",
            //             "document": "33.040.601/0001-87",
            //             "description": "Crédito. Financiamento E Investimentos",
            //             "website": "http://www.mercantildobrasil.com.br/",
            //             "region": "Brazil/Sao Paulo",
            //             "currency": "BRL",
            //             "market_time": {
            //                 "open": "10:00",
            //                 "close": "17:30",
            //                 "timezone": -3
            //             },
            //             "logo": {
            //                 "small": "https://assets.hgbrasil.com/finance/companies/small/merc-financ.png",
            //                 "big": "https://assets.hgbrasil.com/finance/companies/big/merc-financ.png"
            //             },
            //             "market_cap": 142.53,
            //             "price": 7.11,
            //             "change_percent": -9.77,
            //             "updated_at": "2023-06-01 17:07:54"
            //         },
            //         "ENGI4": {
            //             "kind": "stock",
            //             "symbol": "ENGI4",
            //             "name": "EnergiSA",
            //             "company_name": "EnergiSA S.A.",
            //             "document": "00.864.214/0001-06",
            //             "description": "Sociedade de Participações em Outras Empresas. Predominantemente em Distribuidoras de Energia Elétrica.",
            //             "website": "http://www.energisa.com.br/",
            //             "region": "Brazil/Sao Paulo",
            //             "currency": "BRL",
            //             "market_time": {
            //                 "open": "10:00",
            //                 "close": "17:30",
            //                 "timezone": -3
            //             },
            //             "logo": {
            //                 "small": "https://assets.hgbrasil.com/finance/companies/small/energisa.png",
            //                 "big": "https://assets.hgbrasil.com/finance/companies/big/energisa.png"
            //             },
            //             "market_cap": 19091.8,
            //             "price": 7.42,
            //             "change_percent": -7.13,
            //             "updated_at": "2023-06-01 17:07:54"
            //         },
            //         "BEEF": {
            //             "kind": "stock",
            //             "symbol": "BEEF",
            //             "name": "Minerva",
            //             "company_name": "Minerva S.A.",
            //             "document": "67.620.377/0001-14",
            //             "description": "Líder Na América Do Sul Na Exportação de Carne Bovina In Natura E Seus Derivados. E Que Atua Também No Segmento de Processados.",
            //             "website": "http://www.minervafoods.com/ri/",
            //             "region": "Brazil/Sao Paulo",
            //             "currency": "BRL",
            //             "market_time": {
            //                 "open": "10:00",
            //                 "close": "17:30",
            //                 "timezone": -3
            //             },
            //             "logo": {
            //                 "small": "https://assets.hgbrasil.com/finance/companies/small/minerva.png",
            //                 "big": "https://assets.hgbrasil.com/finance/companies/big/minerva.png"
            //             },
            //             "market_cap": 114943.0,
            //             "price": 61.0,
            //             "change_percent": -6.15,
            //             "updated_at": "2023-06-01 17:07:54"
            //         }
            //     },
            //     "execution_time": 0.09,
            //     "from_cache": false
            // });
            return await http.get(`${baseUrl.current}/finance/stock_price`, {
                params: {
                    key: token.current,
                    symbol: type,
                    format: 'json-cors'
                }
            });
        } catch (error) {
            console.error('Error on get low/high price', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    function buildStocksPrices(result: any): any {
        return (key: string) => {
            const stock = result[key];
            return {
                symbol: stock.symbol,
                name: stock.name,
                price: stock.price,
                change_percent: stock.change_percent,
                logo: stock?.logo?.small
            };
        };
    }

}

export function useStockRadarContext() {
    return useContext(StockRadarContext);
}