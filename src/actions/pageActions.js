"use strict";

import {
  OPEN_FILE,
  REDRAW_PAGE,
  SINGLE_NEXT_PAGE,
  SINGLE_PREVIEW_PAGE,
  DOUBLE_NEXT_PAGE,
  DOUBLE_PREVIEW_PAGE
} from "../constants/ActionTypes";

export const openFile = filePath => ({
  type: OPEN_FILE,
  filePath: filePath
});

export const redrawPage = () => ({
  type: REDRAW_PAGE
});

export const singleNextPage = () => ({
  type: SINGLE_NEXT_PAGE
});

export const singlePreviewPage = () => ({
  type: SINGLE_PREVIEW_PAGE
});

export const doubleNextPage = () => ({
  type: DOUBLE_NEXT_PAGE
});

export const doublePreviewPage = () => ({
  type: DOUBLE_PREVIEW_PAGE
});
