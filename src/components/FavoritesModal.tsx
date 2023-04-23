import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonText,
  IonIcon,
} from "@ionic/react";
import { heartDislike, star } from "ionicons/icons";
import { useState } from "react";
import { BeerItem } from "../utils/types";
import styles from "./FavoritesModal.module.css";

export interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const [favs, setFavs] = useState<BeerItem[]>([]);

  const storage = localStorage.getItem("fav");
  const favorites: BeerItem[] = storage && JSON.parse(storage);

  const saveFav = (item: BeerItem[]) => {
    localStorage.setItem("fav", JSON.stringify(item));
  };

  const removeFavorite = (beer: BeerItem) => {
    const newFavorite = favorites.filter((fav) => fav !== beer);
    setFavs(newFavorite);
    saveFav(newFavorite);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {favorites.length ? (
          <IonList>
            {favorites.map((beer: BeerItem) => (
              <IonItem key={beer.id}>
                {beer.name} ({beer.abv}%) — {beer.tagline}
                <IonIcon
                  slot="end"
                  icon={heartDislike}
                  onClick={() => removeFavorite(beer)}
                />
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonText className={styles.message}>
            Nothing was added to the list
          </IonText>
        )}
      </IonContent>
    </IonModal>
  );
}
