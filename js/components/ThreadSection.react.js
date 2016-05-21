/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var React = require('react');
var ThreadListItem = require('../components/ThreadListItem.react');
var ThreadStore = require('../stores/ThreadStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');

function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    isShow:ThreadStore.getShowState(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount()
  };
}

var ThreadSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ThreadStore.addChangeListener(this._onChange);
    ThreadStore.addDisplayListener(this._onChange);
    UnreadThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ThreadStore.removeChangeListener(this._onChange);
    ThreadStore.removeDisplayListener(this._onChange);
    UnreadThreadStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var show = this.state.isShow,
        style={display:show?"block":"none"};
    var threadListItems = this.state.threads.map(function(thread) {
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
        />
      );
    }, this);
    var unread =
      this.state.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;
    return (
      <div className="thread-section" style={style}>
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-content">
          {threadListItems}
          </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = ThreadSection;