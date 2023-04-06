import {
  IonContent,
  IonHeader,
  IonImg,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import { restApiService } from "../utils/RestApiService";
import { BeerItem } from "../utils/types";
import styles from "./BeerList.module.css";


const BeerList = () => {
  const [data, setData] = useState<BeerItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  useEffect(() => {
    restApiService.getBeers().then((res) => setData(res));
  }, []);
  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className={styles.heading}>Beer Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className={styles.list} inset={true}>
          {currentRecords &&
            currentRecords.map((beerItem) => {
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
        <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
      </IonContent>
    </IonPage>
  );
};

export default BeerList;
