import { Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import BeerList from "./components/BeerList";
import { star } from "ionicons/icons";
import styles from "./App.module.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
import { restApiService } from "./utils/RestApiService";
import { BeerItem } from "./utils/types";
import { FavoritesModal } from "./components/FavoritesModal";

setupIonicReact();

const App = () => {
  const [data, setData] = useState<BeerItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    restApiService.getBeers().then((res) => setData(res));
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/home">
          <IonPage>
            <IonContent className={styles.content} fullscreen>
              <IonHeader>
                <IonToolbar>
                  <IonTitle className={styles.heading}>Beer Menu</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonButton
                className={styles.favBtn}
                onClick={() => setIsOpen(true)}
              >
                <IonIcon slot="start" icon={star}></IonIcon>Favorites
              </IonButton>
              <BeerList beers={currentRecords} />
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
              <FavoritesModal isOpen={isOpen} onClose={() => handleClose()} />
            </IonContent>
          </IonPage>
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
