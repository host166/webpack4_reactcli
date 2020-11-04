import { connect } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

/**
 * Tool
 * 简化 redux connect 的写法
 * @param {{}} mapState StateName
 * @param {Object} mapAction ActionTypeName
 * @constructor
 */
export const ReduxConnect = function (mapState = {}, mapAction = {},) {

  // 统一写法
  const mapStateToProps = (state) => {
    const propsState = {};

    if (mapState instanceof Array) {
      mapState.forEach(stateName => {
        propsState[stateName] = state[stateName];
      });
    } else {
      for (const key in mapState) {
        propsState[key] = state[key];
      }
    }
    return propsState;
  };

  const mapDispatchToProps = (dispatch) => {
    const propsAction = {};
    for (const key in mapAction) {
      const action = createAction(mapAction[key]);
      propsAction[key] = (...args) => dispatch(action(...args));
    }

    return propsAction;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  );
};
