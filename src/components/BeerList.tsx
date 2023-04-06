import {
  IonHeader,
  IonImg,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { BeerItem } from "../utils/types";
import styles from "./BeerList.module.css";

export interface BeerListProps {
  beers: BeerItem[];
}

const BeerList = ({ beers }: BeerListProps) => {

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle className={styles.heading}>Beer Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList className={styles.list} inset={true}>
        {beers &&
          beers.map((beerItem) => {
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
    </>
  );
};

export default BeerList;
