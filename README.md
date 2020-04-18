Node Queue Runner
==============
A class to facilitate queuing and running jobs. Right now it only implements a
synchronous queue, but it might be extended in the future to enable async jobs.

Basic Usage
-----------
First install: `npm install --save node-queue-runner`

This class is meant to be extended (think of an abstract class in other languages).

```js
const JobQueue = require('node-queue-runner');

class MyJobQueue extends JobQueue {

    runJob(job) {

        return new Promise( ... );
    }
}

const myJobs = new MyJobQueue(startDelay);

myJobs.addJob('Whatever your runJob method expects. Must be truthy');

myJobs.on('jobFinish', (job, jobQueue) => {
    console.log(job + ' just finished.');
    console.log('Now the queue looks like this: ' + jobQueue);
});

myJobs.on('queueEmpty', () => {
    console.log('Queue is now empty.');
});
```

Subclasses are expected to override the `runJob()` method. That method must
return a Promise that resolves when the job is finished (or rejects on errors).

API Details
-----------
The constructor takes the following arguments:

- `startDelay` (optional, default: `0`): Wait this many milliseconds before
  starting the first job. After the first job has started there is no delay
  between jobs.
- `jobDelay` (optional, default: `0`): Wait this many milliseconds in between
  jobs as we process the queue.
- `autoStart` (optional, default: `false`): Starts the queue as soon as a job is added.
 If `false`, the queue will need to be manually started a first time, then every time
  the queue is emptied (ie when `queueEmpty` has fired).

The class emits the following events that you can listen for.

- `jobStart`: Triggered when a queued job starts. Listener args: `(job, jobQueue)`
- `jobFinish`: Triggered when a job completes. Listener args: `(job, jobQueue)`
- `jobAdd`: Triggered when a job is added to the queue. Listener args: `(job, jobQueue)`
- `jobRemove`: Triggered when a job is removed from the queue. Listener args: `(jobQueue)`
- `queueError`: Triggered when a job Promise rejects or when other errors occur. Listener args: `(error, jobQueue)`

The only "public" methods are:

- `startJobs`: manually starts to process the queue.
- `addJob`: Pass in anything (string, object, function, etc.) that your runJob method
  expects to process. Must be a truthy value (i.e. `jobs.addjob(0)` will fail).
- `getQueue`: Returns an array of jobs currently in the queue.
