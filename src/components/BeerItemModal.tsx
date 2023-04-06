import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { BeerItem } from "../utils/types";
import { star } from "ionicons/icons";
import styles from "./BeerItemModal.module.css";

export interface BeerItemModalProps {
  beerId: string;
  beers: BeerItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function BeerItemModal({
  beerId,
  beers,
  isOpen,
  onClose,
}: BeerItemModalProps) {
  const selectedBeer = beers.find((beer) => beer.id === beerId);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{selectedBeer?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.container}>
          <IonImg
            src={selectedBeer?.image_url}
            className={styles.beerImg}
            alt={selectedBeer?.name}
          ></IonImg>
          <p className={styles.beerName}>{selectedBeer?.name}</p>
          <p className={styles.date}>
            first brewed in {selectedBeer?.first_brewed}
          </p>
          <p className={styles.tagline}>{selectedBeer?.tagline}</p>
          <p className={styles.description}>"{selectedBeer?.description}"</p>
          <IonButton color="dark">
            <IonIcon slot="start" icon={star}></IonIcon>
            Add to Favorites
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
}
