import { Component, VERSION } from "@angular/core";
import { TemplateUsageVisitor } from "@angular/core/schematics/migrations/static-queries/strategies/usage_strategy/template_usage_visitor";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  //variable declarando tablero.
  tablero = new Array(3); // [, , ]
  //Variable declarando turno de jugador 
  turno: boolean = true;
  //Variable declarando jugador X
  jugadorX: string = "";
  //Variable declarando jugador O
  jugadorO: string = "";
  // variable boolean para activar tablero tres en raya y tabla de jugadores
  juegoActivo: boolean = false;
  // Contador de tablero
  contador: number = 0;
  //Contador para X
  contadorX: number = 0;
  //Contador para O
  contadorO: number = 0;
  //Array para llenar tabla jugadores
  juegos: any[] = [];
  //variable para entrada input jugador X
  entra = null;
  //variable para entrada input jugador O
  entra2= null;
  //Mensaje para alerta
  mensaje: string = " Inicia juego";
  //variable boolean para habilitar y deshabilitar botón Limpiar
  btndes= true;

  constructor() {
    this.inicializar();
  }

  // Me permite inicializar el Tablero
  inicializar() {
    for (let i = 0; i < 3; i++) {
      this.tablero[i] = new Array(3); // [ [,,], [,,],[,,] ]
    }

  }

  iniciarJuego() {
    //Llamamos la funcion inicializar() que nos inicia el tablero del tres en raya
    this.inicializar();
    //Llamamos  variable btndes utilizandola como booleana para habilitar y deshabilitar el boton "Limpiar"
    this.btndes= false;
    //Se realiza validación de los input no estén vacios.
    if (this.jugadorX == "" && this.jugadorO == "") {
      alert("El nombre de los jugadores no puede quedar vacio");
    } else {
      if (this.jugadorX != null) {
        this.entra = document.getElementById("jugadorA");
        this.entra.disabled = !this.entra.disabled;
      }
      if (this.jugadorO != null) {
        this.entra2 = document.getElementById("jugadorB");
        this.entra2.disabled = !this.entra2.disabled;
      }
      //Se habilita el tablero del tres en raya y tablero de jugadores.
      this.juegoActivo = true;
    }
    //Se envia una alerta validando si el jugador "X" o jugador "O" inicia juego
    alert(this.turno ? "X" + this.mensaje : "O" + this.mensaje);
  }

  nuevoJuego() {
    //Iniciamos tablero tres en raya
    this.inicializar();
    //ponemos DISABLE el tablero tres en raya y la tabla de jugadores
    this.juegoActivo = false;
    //Ponemos activas las casillas para ingresar o  modificar el nombre del jugador "X" o "O"
    this.entra.disabled = false;
    this.entra2.disabled = false;
    //Limpiamos casillas de los nombres de los jugadores
    this.jugadorX = "";
    this.jugadorO = "";
    //Limpiamos tabla de jugadores
    this.juegos = [];
    //Ponemos DISABLE boton "Limpiar"
    this.btndes = true;
  }

  marcarPosicion(fila: number, columna: number) {
    //Validamos que this.turno va a tener valor X o O
    this.tablero[fila][columna] = this.turno ? "X" : "O";
    this.turno = !this.turno;
    this.contador++;
    if (this.contador >= 5) {
      this.verificarJuego();
    }
  }

  verificarJuego() {
    //Verifica si se hace tres en raya en filas
    //Recorremos filas
    for (var fila = 0; fila <= 2; fila++) {
      //Llamamos variables de contador de "X" y "O"
      this.contadorO = 0;
      this.contadorX = 0;
      //Recorremos columnas
      for (var columna = 0; columna <= 2; columna++) {
        //Validamos si se ha marcado "X"
        if (this.tablero[fila][columna] == "X") {
          //Iniciamos contador de x
          this.contadorX++;
        }
        //Validamos si se ha marcado "O"
        if (this.tablero[fila][columna] == "O") {
          //Iniciamos contador de o
          this.contadorO++;
        }
        //Validamos si el contador de X es igual a 3
        if (this.contadorX == 3) {
          //De ser así llamamos la funcion resultadoJuego() con el parametro X que es el ganador
          this.resultadoJuego("X");
        }
        //Validamos si el contador de O es igual a 3
        if (this.contadorO == 3) {
          //De ser así llamamos la funcion resultadoJuego() con el parametro O que es el ganador
          this.resultadoJuego("O");
        }
      }
    }
    //Verifica si se hace tres en raya en columnas
    //Recorremos columnas
    for (var columna = 0; columna <= 2; columna++) {
      //Llamamos variables de contador de "X" y "O"
      this.contadorO = 0;
      this.contadorX = 0;
      //Recorremos filas
      for (var fila = 0; fila <= 2; fila++) {
        //Validamos si se ha marcado "X"
        if (this.tablero[fila][columna] == "X") {
          //Iniciamos contador de x
          this.contadorX++;
        }
        //Validamos si se ha marcado "O"
        if (this.tablero[fila][columna] == "O") {
          //Iniciamos contador de o
          this.contadorO++;
        }
        //Validamos si el contador de X es igual a 3
        if (this.contadorX == 3) {
          //De ser así llamamos la funcion resultadoJuego() con el parametro X que es el ganador
          this.resultadoJuego("X");
        }
        //Validamos si el contador de O es igual a 3
        if (this.contadorO == 3) {
          //De ser así llamamos la funcion resultadoJuego() con el parametro O que es el ganador
          this.resultadoJuego("O");
        }
      }
    }
    //Iniciamos contadores X y O
    this.contadorO = 0;
    this.contadorX = 0;
    //Verifica si se hace tres en raya en diagonales derechas
    //Recorremos filas
    for (var fila = 0; fila <= 2; fila++) {
      //Validamos si las posiciones en fila para diagonales [0,0],[1,1],[2,2] son iguales a X
      if (this.tablero[fila][fila] == "X") {
        //Iniciamos contador X
        this.contadorX++;
      }
      //Validamos si las posiciones en fila para diagonales [0,0],[1,1],[2,2] son iguales a O
      if (this.tablero[fila][fila] == "O") {
        //Iniciamos contador O
        this.contadorO++;
      }
      //Validamos si el contador de X es igual a 3
      if (this.contadorX == 3) {
        //De ser así llamamos la funcion resultadoJuego() con el parametro X que es el ganador
        this.resultadoJuego("X");
      }
      //Validamos si el contador de O es igual a 3
      if (this.contadorO == 3) {
        //De ser así llamamos la funcion resultadoJuego() con el parametro O que es el ganador
        this.resultadoJuego("O");
      }
    }
    //Iniciamos contadores X y O
    this.contadorO = 0;
    this.contadorX = 0;
    //Verifica si se hace tres en raya en diagonales izquierdas
    //Recorremos filas
    for (var fila = 0; fila <= 2; fila++) {
      //Validamos si las posiciones en fila para diagonales [0,2],[1,1],[2,0] son iguales a X
      if (this.tablero[fila][2 - fila] == "X") {
        //Iniciamos contador X
        this.contadorX++;
      }
      //Validamos si las posiciones en fila para diagonales [0,2],[1,1],[2,0] son iguales a O
      if (this.tablero[fila][2 - fila] == "O") {
        //Iniciamos contador O
        this.contadorO++;
      }
      //Validamos si el contador de X es igual a 3
      if (this.contadorX == 3) {
        //De ser así llamamos la funcion resultadoJuego() con el parametro X que es el ganador
        this.resultadoJuego("X");
      }
      //Validamos si el contador de O es igual a 3
      if (this.contadorO == 3) {
        //De ser así llamamos la funcion resultadoJuego() con el parametro O que es el ganador
        this.resultadoJuego("O");
      }
    }
    //Validamos empate del tres en raya
    //LLamamos al contador y lo igualamos a nueve
    if (this.contador == 9) {
      //De ser así llamamos la función resultadoJuego() con dos parametros el cual el "0" valida que es empate
      this.resultadoJuego("", 0);
    }
  }
  //Funcion resultado tiene dos parámetros, los cuales el primero es el ganador y el segundo el validador del empate por defecto es "1" cuando hay un ganador de lo contrario se le da el valor de 0
  resultadoJuego(ganador: string, empate: number = 1) {
    //Validamos si el valor del parametro empate es 0
    if (empate == 0) {
      //Se ingresan valoresa la tabla, llamando el jugador X, jugador O y pr último Empate
      this.juegos.push([this.jugadorX, this.jugadorO, "Empate"]);
      //Alerta anunciando empate.
      alert("Empate!");
    } else {
      //Se valida si el ganador es "X"
      if (ganador == "X") {
        //Se asigna nombre del ganador a lavariable jugadorX
        ganador = this.jugadorX;
      } else {
        //Se asigna nombre del ganador a lavariable jugadorO
        ganador = this.jugadorO;
      }
      //Se ingresan valoresa la tabla, llamando el jugador X, jugador O y pr último el ganador
      this.juegos.push([this.jugadorX, this.jugadorO, ganador]);
      //Alerta anunciando ganador del juego.
      alert("Jugador " + ganador + " ha ganado");
    }
    //Se inicia contador
    this.contador = 0;
    //Se inicia el tablero tres en raya
    this.iniciarJuego();
  }
}
