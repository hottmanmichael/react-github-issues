import Raven from 'raven-js';
Raven
	.config(process.env.RAVEN_KEY)
	.install();

export let devTools = store => next => action => {
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
	next(action);
}

export let logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export let crashReporter = store => next => action => {
	next(action);
  // try {
	// 	throw new Error("Loading Error")
  //   // return next(action)
  // } catch (err) {
	//
	// 	let user = {
	// 		email: 'michael@example.com',
	// 		id: 123
	// 	};
	//
  //   console.error('Caught an exception!', store)
	// 	for (var i = 0; i < 3; i++) {
	// 		Raven.captureBreadcrumb({
	// 			message: 'Some sort of action describer',
	// 			category: 'action',
	// 			data: {
	// 				id: i
	// 			}
	// 		});
	// 	}

  //   Raven.captureException(err, {
	// 		logger: action.type,
	// 		level: 'info', //Indicates severity -
	// 					// debug (the least serious)
	// 					// info
	// 					// warning
	// 					// error
	// 					// fatal (the most serious)
	// 		user: user,
	// 		tags: {
	// 			action: action.type
	// 		},
  //     extra: {
  //       action,
  //       state: store.getState(),
	// 			user
  //     }
  //   });
  //   // throw err
  // }
}
