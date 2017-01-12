import { UI } from '../helpers/reduxConstants';
console.log("ui", UI)
const actions = {
	isLoading: function () {
		return {
			type: UI.IS_LOADING
		}
	},
	isLoadingComplete: function () {
		return {
			type: UI.IS_LOADING_COMPLETE
		}
	},
	updatePage: function (page) {
		return {
			type: UI.UPDATE_PAGE,
			page: page
		}
	},
	updatePageComplete: function () {
		return {
			type: UI.UPDATE_PAGE_COMPLETE
		}
	}


}


export default actions;
