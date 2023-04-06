import {
  IonCard,
  IonHeader,
  IonImg,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { BeerItem } from "../utils/types";
import { BeerItemModal } from "./BeerItemModal";
import styles from "./BeerList.module.css";

export interface BeerListProps {
  beers: BeerItem[];
}

const BeerList = ({ beers }: BeerListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBeerId, setSelectedBeerId] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

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
              <IonCard
                className={styles.card}
                key={beerItem.id}
                onClick={() => {
                  setIsOpen(true), setSelectedBeerId(beerItem.id);
                }}
              >
                <IonImg
                  className={styles.beerImg}
                  src={beerItem.image_url}
                  alt={beerItem.name}
                ></IonImg>
                <div className={styles.abv}>ABV: {beerItem.abv}%</div>
              </IonCard>
            );
          })}
      </IonList>
      <BeerItemModal
        beerId={selectedBeerId}
        beers={beers}
        isOpen={isOpen}
        onClose={() => handleClose()}
      />
    </>
  );
};

export default BeerList;
