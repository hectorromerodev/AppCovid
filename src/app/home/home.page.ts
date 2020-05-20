import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  Numerito: number; // Variable para decidir que resultado mostrar en el if
  oxigeno: string;  // Variable donde se muestran los resultados
  color: string; // Variable para el cambio de color en la label de resultados

  datos = {
    numero: 0
  };
  //#region Cronometro
  public segundos = 0;
  public contador: any = 0;
  colors = 'success'; // variable para el cambio dinamico de color
  texto = 'play-outline'; // variable para el texto del boton

  //Siempre lleva constructor mis clases en typescript
  constructor(public alertController: AlertController) {

  }
  //Reiniciar todos los parametros a 0
  restart() {
    clearInterval(this.contador);
    this.datos.numero = null;
    this.Numerito = null;
    this.oxigeno = null;
    this.color = null;
    this.colors = 'success';
    this.texto = 'play-outline';
    this.contador = null;
    this.segundos = 0;
    console.log('Cronometro Reiniciado');
  }
  pause() {
    this.colors = 'success';
    this.texto = 'play-outline';
    clearInterval(this.contador);
    this.contador = null;
  }
  start_stop() {
    if (this.contador === null) {
      this.contador = setInterval(() => { this.segundos += 1; }, 1000);
      console.log('Cronometro Iniciado');
      this.colors = 'warning'; // cambio de color dinamico del boton iniciar
      this.texto = 'pause-outline'; // cambio de texto dinamico del boton iniciar
    } else if (this.contador !== null) {
      console.log('Cronometro Pausado');
      this.pause();
    }
  }
  //#endregion
  ngOnInit() {
    //Al iniciar la app, esto se ejecutara
    this.restart();
  }
  onSubmitTemplate() {
    console.log('Form submit');
    console.log(this.datos);
    this.datos.numero = this.Numerito;
  }
  //#region Mostrar informacion
  Oxigeno() {
    if (this.Numerito < 7 || this.segundos < 5) {
      this.oxigeno = 'El oxígeno es menor a 90%';
      this.color = 'danger';
    } else if (this.Numerito >= 7 && this.Numerito < 10 || this.segundos >= 5 && this.segundos < 7) {
      this.oxigeno = 'El oxígeno es menor a 95%';
      this.color = 'warning';
    } else {
      this.oxigeno = 'El oxígeno es mayor a 95%';
      this.color = 'success';
    }
    this.presentAlert();
  }
  //Para mostrar el resultado en un alert, aun no agrego el color 
  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Estimación de saturación',
      message: this.oxigeno,
      buttons: ['Bien']
    });
    this.restart();

    await alert.present();
  }
  //#endregion
  segmento = 'instrucciones'; //Default es instrucciones
  segmentChanged(nombre_segmento: any) {
    this.segmento = nombre_segmento;
  }

}
