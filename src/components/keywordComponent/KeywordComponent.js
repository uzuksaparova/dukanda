import React from 'react';
import { Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './keywordComponent.scss';

function KeywordComponent(props) {
    const {
        inputValue,
        handleInputChange,
        handleKeypress,
        addKeywordButton,
        keywords,
        handleKeywordDelete,
    } = props;
    return (
        <div className="keyword">
            <div className="keyword-add">
                <input
                    type="text"
                    placeholder="Açar sözler..."
                    value={inputValue}
                    onChange={(e) => handleInputChange(e)}
                    className="keyword-input"
                    onKeyPress={handleKeypress}
                />
                <Button onClick={addKeywordButton} className="keyword-button">
                    Goş
                </Button>
            </div>
            <div className="keyword-display">
                {keywords && keywords.length
                    ? keywords.map((keyword) => {
                          return (
                              <Chip
                                  key={keyword}
                                  className="chip"
                                  variant="outlined"
                                  color="secondary"
                                  label={keyword}
                                  onDelete={() => handleKeywordDelete(keyword)}
                              />
                          );
                      })
                    : null}
            </div>
        </div>
    );
}

export default KeywordComponent;
