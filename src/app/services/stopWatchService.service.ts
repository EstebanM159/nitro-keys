import { computed, Injectable, linkedSignal, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import TEXTOS_MECANOGRAFIA from '../../../public/assets/texts.json';
import type { TextInterface } from '../interfaces/Text.interface';
// const TEXTOS_MECANOGRAFIA: string[] = [
//   'El código fluye a través de las venas de la ciudad mientras los ciudadanos duermen bajo el resplandor de los carteles publicitarios. No hay espacio para el error en esta nueva era digital donde cada pulsación de tecla puede significar la diferencia entre la libertad absoluta o el olvido.',
//   'La inteligencia artificial ha tomado el control de los suministros de energía vital. Si decides desafiar al sistema, asegúrate de que tus reflejos sean más rápidos que sus algoritmos de detección. El mañana pertenece a los que pueden escribir su propio destino sin miedo a las consecuencias finales.',
//   'Caminar por las calles oxidadas de la vieja capital te hace comprender que el progreso tuvo un precio demasiado alto para la humanidad. Los cables cuelgan como lianas en una selva de acero y silicio, esperando que alguien con el valor suficiente logre reconectar la señal del pasado.',
//   'Ha hecho un buen trabajo hasta ahora, pionero del futuro. Aunque si cree que sufre de debilidad o recibió radiación y, por consiguiente, el mañana no debería empezar con usted, vuelva ahora mismo a su tribu y mande a alguien mejor cualificado para ocupar su lugar en la historia.',
//   'Los protocolos de seguridad nivel siete han sido activados tras la brecha detectada en el núcleo central. Los centinelas mecánicos patrullan los pasillos mientras los últimos rebeldes intentan descargar los planos de la ciudadela antes de que la energía se agote por completo y todo quede a oscuras.',
//   'Tu conexión neuronal presenta una latencia inaceptable para los estándares de la corporación. Si no logras estabilizar la frecuencia de entrada, procederemos al borrado preventivo de tu memoria a corto plazo. Recuerda que tu lealtad es el único activo que realmente valoramos en este sector abandonado.',
//   'Las naves de transporte despegan hacia las colonias exteriores dejando atrás un mundo cubierto por ceniza y neón. Aquellos que nos quedamos debemos aprender a reciclar la tecnología desechada para construir un nuevo hogar bajo tierra. La superficie ya no es un lugar seguro para nuestra especie.',
//   'El flujo de datos es constante y abrumador para una mente que no ha sido aumentada mediante implantes de última generación. Debes concentrarte en los bits que realmente importan y filtrar el ruido blanco de la red si pretendes encontrar la llave de acceso a la base de datos.',
//   'Un error en la secuencia de comandos provocó el colapso de la red de transporte automatizado en toda la región. Ahora los drones de reparación trabajan incansablemente para restablecer el orden, pero los ciudadanos ya han descubierto que el sistema es mucho más vulnerable de lo que pensaban.',
//   'Bajo la lluvia ácida que cae sobre los rascacielos, los mercaderes de información venden secretos a cambio de créditos de energía. No confíes en nadie que ofrezca ayuda sin pedir nada a cambio, pues en este laberinto de cristal y metal, el altruismo desapareció hace muchas décadas.',
// ];
@Injectable({
  providedIn: 'root',
})
export class StopWatchService {
  private timerSubscription?: Subscription;
  isRunning = signal(false);
  stopwatch = signal(0);
  characterPerMinute = signal<number>(0);
  errorCount = signal<number>(0);
  correctCharacters = signal<number>(0);
  time = signal(0);
  text = linkedSignal<TextInterface>(
    () => TEXTOS_MECANOGRAFIA[Math.floor(Math.random() * TEXTOS_MECANOGRAFIA.length)],
  );
  // text = signal<string>('la toma ha sido completada');
  accuracy = signal<string>('100.0%');
  start() {
    if (!this.isRunning()) {
      this.isRunning.set(true);
      // timer(retrasoInicial, intervalo);
      this.timerSubscription = timer(0, 10).subscribe(() => {
        this.stopwatch.update((c) => c + 10);
      });
    }
  }
  pause() {
    this.isRunning.set(false);
    this.time.set(this.stopwatch());
    this.calculateStadistics();
    this.timerSubscription?.unsubscribe();
  }
  reset() {
    this.pause();
    this.stopwatch.set(0);
    this.errorCount.set(0);
    this.correctCharacters.set(0);
    this.accuracy.set('100.0%');
    this.characterPerMinute.set(0);
  }

  newText() {
    const randomText = TEXTOS_MECANOGRAFIA[Math.floor(Math.random() * TEXTOS_MECANOGRAFIA.length)];
    this.text.set(randomText);
  }

  registerCorrectKeystroke() {
    this.correctCharacters.update((c) => c + 1);
    this.calculateStadistics();
  }

  registerError() {
    this.errorCount.update((c) => c + 1);
    this.calculateStadistics();
  }
  calculateStadistics() {
    const elapsedMs = this.isRunning() ? this.stopwatch() : this.time();
    if (elapsedMs <= 0) return;
    const timeInMinutes = elapsedMs / 60000;
    this.characterPerMinute.set(this.correctCharacters() / timeInMinutes);
    const totalKeystrokes = this.correctCharacters() + this.errorCount();
    const currentAccuracy =
      totalKeystrokes > 0 ? (this.correctCharacters() / totalKeystrokes) * 100 : 100;
    this.accuracy.set(`${currentAccuracy.toFixed(1)}%`);
  }
}
