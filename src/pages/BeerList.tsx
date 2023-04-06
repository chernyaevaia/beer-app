import {
  IonContent,
  IonHeader,
  IonImg,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { restApiService } from "../utils/RestApiService";
import { BeerItem } from "../utils/types";
import styles from "./Home.module.css";

const BeerList: React.FC = () => {
  const [data, setData] = useState<BeerItem[]>();

  useEffect(() => {
    restApiService.getBeers().then((res) => setData(res));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className={styles.heading}>Beer Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className={styles.list} inset={true}>
          {data &&
            data.map((beerItem) => {
              return (
                <div className={styles.card} key={beerItem.id}>
                  <IonImg
                    className={styles.beerImg}
                    src={beerItem.image_url}
                    alt={beerItem.name}
                  ></IonImg>
                  <div className={styles.abv}>ABV: {beerItem.abv}%</div>
                </div>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default BeerList;
