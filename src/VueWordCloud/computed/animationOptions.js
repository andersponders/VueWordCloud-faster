import Function_stubNull from '/utils/Function/stubNull';
import Object_isObject from '/utils/Object/isObject';
import Object_mapValues from '/utils/Object/mapValues';
import String_isString from '/utils/String/isString';

export default function() {
	let {
		animationDuration,
		enterAnimation,
		leaveAnimation,
	} = this;
	if (Object_isObject(enterAnimation) && Object_isObject(leaveAnimation)) {
		let remainAnimation = Object_mapValues({
			...enterAnimation,
			...leaveAnimation,
		}, Function_stubNull);
		let beforeEnter = function(el) {
			Object.assign(el.style, enterAnimation);
		};
		let enter = function(el, done) {
			setTimeout(() => {
				Object.assign(el.style, remainAnimation);
				setTimeout(done, animationDuration);
			}, 1);
		};
		let leave = function(el, done) {
			Object.assign(el.style, leaveAnimation);
			setTimeout(done, animationDuration);
		};
		let beforeAppear = beforeEnter;
		let appear = enter;
		return {
			props: {
				css: false,
			},
			on: {
				beforeAppear,
				appear,
				beforeEnter,
				enter,
				leave,
			},
		};
	}
	if (String_isString(enterAnimation) && String_isString(leaveAnimation)) {
		return {
			props: {
				duration: animationDuration,
				appear: true,
				appearActiveClass: enterAnimation,
				enterActiveClass: enterAnimation,
				leaveActiveClass: leaveAnimation,
			},
		};
	}
	return {};
}
