/**
 * A class for executing functions after a certain delay *synchronously*.
 * Can also execute repeatedly, or instantly.
 * [May be memory-intensive with many operations, unless `repeat()` is used.]
 */
class Timer {
  static main = new this();
  /** Array of functions waiting to be executed.
   * @type {TimerOperation[]} */
  #operations = [];
  /** The next free ID number*/
  #nextId = 0;
  /** The number of operations waiting for execution */
  get operationCount() {
    return this.#operations.length;
  }
  tick() {
    this.#operations.forEach((operation, index) => {
      operation.tick();
      //execute if delay has run out
      if (operation.executed) {
        this.#operations.splice(index, 1);
      }
    });
  }
  /**
   * Adds a function call to be executed after a specified delay.
   * @param {function} func Function to call, after the delay.
   * @param {int} delay The delay, in frames. Zero means the same frame (i.e. when the timer next ticks). `-1` means do it *now*.
   * @param {...*} parameters Additional parameters to pass in to the function on call.
   * @returns {int} The ID this operation is using. Used in `Timer.cancel()`. Returns `-1` if delay was `-1`, and the function was instantly executed.
   */
  do(func, delay = 0, ...parameters) {
    if (delay < 0) {
      func();
      return -1;
    }
    this.#operations.push(new TimerOperation(func, delay, this.#nextId, parameters));
    //Increment the ID
    this.#nextId++;
    //Return the id used
    return this.#nextId - 1;
  }
  /**
   * Repeats a function call every so many ticks, with a configurable initial delay.  
   * Passes in the current iteration number (i.e. the first iteration will be passed `0`, the second `1`, etc.).  
   * Every call shares the same ID, so can all be cancelled at once.  
   * More memory-efficient than repeatedly calling `Timer.do()`.
   * @param {(iteration: int) => void} func Function to call.
   * @param {int} times The number of times to repeat this function call.
   * @param {int} interval The number of timer ticks between functions. `0` makes all functions execute in the same tick. Any values below `0` have no effect.
   * @param {int} delay How many ticks to wait before the first call.
   * @param {...*} parameters Additional parameters to pass in to the function on call.
   * @returns {int} The ID the operations are using. Used in `Timer.cancel()`.
   */
  repeat(func, times, interval = 1, delay = 0, ...parameters) {
    this.#operations.push(new TimerOperation(func, delay, this.#nextId, parameters, times, interval));
    //Increment the ID
    this.#nextId++;
    //Return the id used
    return this.#nextId - 1;
  }
  /**
   * Cancels one or more operations. Can cancel all at once, based on ID, or based on function called. Can also remove duplicate operations.
   * @param {int|int[]|"*"|Function|Timer} id Identifier(s) of the operation(s) to cancel, `*` if all operations are to be cancelled, or a function to compare operations with. Can also be another Timer, in which case any duplicate operations will be removed *from this timer*.
   */
  cancel(id) {
    //If one is to be removed
    if (typeof id === "number") {
      //Remove all operations with the specified id (should only be one, unless repeat() was used.)
      this.#operations = this.#operations.filter((x) => x.id !== id);
    } else if (typeof id === "object" && Array.isArray(id)) {
      //Remove all operations with any specified id
      this.#operations = this.#operations.filter((x) => !id.includes(x.id));
    } else if (id === "*") {
      //Remove all
      this.#operations = [];
    } else if (id instanceof Timer) {
      //FOr each operation in the passed-in timer
      id.#operations.forEach((y) => {
        //Remove any in this one
        this.#operations = this.#operations.filter(
          //That match in function and delay
          (x) => !(x.func === y.func && x.delay === y.delay)
        );
      });
    } else if (typeof id === "function") {
      //I think you now what this does by now
      this.#operations = this.#operations.filter((x) => x.func !== id);
    }
  }
}
/** Represents a single or repeated operation. */
class TimerOperation {
  #repeated = 0;
  #currentIntervalWait = 0;
  #shouldRepeat = false;
  executed = false;
  constructor(
    func,
    delay = 0,
    id = 0,
    params = [],
    repeatNumber = 1,
    repeatInterval = 1
  ) {
    this.id = id;
    this.func = func;
    this.delay = delay;
    this.params = params;
    this.repeatNumber = repeatNumber;
    //Only repeats if executing more than once (duh)
    this.#shouldRepeat = repeatNumber > 1;
    this.repeatInterval = repeatInterval;
  }
  tick() {
    //Don't run if already finished
    if (this.executed) return;
    //Reduce delay
    this.delay--;
    //If ready to go:
    if (this.delay < 0) {
      if (this.#shouldRepeat) {
        //If repeating

        if (this.#currentIntervalWait <= 0) {
          //increase repeats
          this.#repeated++;
          //Stop if finished repeating
          if (this.#repeated > this.repeatNumber) {
            this.executed = true;
            return;
          }
          //execute
          this.func(this.#repeated - 1, ...this.params);
          //reset interval
          this.#currentIntervalWait = this.repeatInterval;
        } else {
          //Continue counting
          this.#currentIntervalWait--;
        }
      } else {
        //If not

        //execute
        this.func(...this.params);
        //Stop
        this.executed = true;
      }
    }
  }
}
