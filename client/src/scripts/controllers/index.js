
import Index from '../views/index';
import UIActions from '../actions/ui';

var connect = require('react-redux').connect;

function mapStateToProps(state, ownProps) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		load: function() {

		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
