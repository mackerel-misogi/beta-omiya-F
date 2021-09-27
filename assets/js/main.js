/**********************************************************************************************************
 * 解答入力欄のコンポーネントです。入力欄・送信ボタン・エラーメッセージを表示します。
 * <answer-input v-bind:correct="解答" v-on:answer-input="answerInput(event, stage, number, final)"></answer-input>
 * 解答：correctAnswer['stage1']['q1']
 * answerInput(event, stage, number, final)：
 *          event ：$event
 *          stage ：STAGE名 'stage1'
 *          number：問題番号（数字） 1
 *          final ：最終ステージの場合 'final'
 *********************************************************************************************************/
 const app = Vue.createApp({
  data() {
    /* 初期値を設定します */
    return {
      /* 解答
      *  ex. 問題2-3を追加する場合はstage2の配列に解答を追加します。
      *    q3: 'おおお',
      */
      correctAnswer: {
        stage1: {
          q1: 'きく',
        },

        stage2: {
          q1: 'りかしつ',
        },
        stage3: {
          q1: '0806',
        },
        stage4:{
          q1: 'かいい',
        },
        stage5:{
          q1: 'きくをそなえよう',
        }
      },

      /* それぞれの問題が正解かどうか
      *  ex. 問題2-3を追加する場合は配列にfalseを追加します。
      */
      answer: {
        stage1: [
          false,
        ],
        stage2: [
          false, // 2-1
          // false, // 2-2
          // false, // 2-3
        ],
        stage3: [
          false, // 3-1
          // false, // 3-2
          // false, // 3-3
        ],
        stage4: [
          false,
        ],
        stage5:[
          false,
        ]
      },

      /* ステージの問題が全て正解かどうか */
      clear: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,
        stage5: false,
      },

      /* 次のステージを表示するかどうか
      *  最終ステージはページを遷移するので設定不要です。
      */
      next: {
        stage1: false,
        stage2: false,
      },
    }
  },
  methods: {
    /* 「送信」ボタンをクリックした場合の動作です。 */
    answerInput(event, stage, number) {
      /* answerをtrueまたはfalseにします。 */
      this.answer[stage][number-1] = event;
      /* STAGEのすべての問題がtrueか調べてclearの値を変更します。*/
      const result = this.answer[stage].every((element) => {
        return element;
      });
      this.clear[stage] = result;
      /* ステージ遷移の入力を判定します。 */
      if ( this.clear[stage] === true && stage === 'stage2' ) {
        window.location.href = 'main2.html';
      }

      if ( this.clear[stage] === true && stage === 'stage3' ) {
        window.location.href = 'main3.html';
      }

      if ( this.clear[stage] === true && stage === 'stage4' ) {
        window.location.href = 'main4.html';
      }
      if ( this.clear[stage] === true && stage === 'stage5' ) {
        window.location.href = 'final.html';
      }
    },
    /* クリア画面「次のステージへ」ボタンをクリックした時の動作を設定します
    *  clearをfalseにしてクリア画面を非表示にします。
    *  nextをtrueにして次のステージを表示します。
    */
    nextStage(stage) {
      this.clear[stage] = false;
      this.next[stage] = true;
    },
  }
})

/* 解答入力欄のコンポーネント １問目*/
app.component('answer-input', {
  props: ['correct'],
  data: function () {
    return {
      /* 送信ボタン上下に表示されるメッセージ */
      okMessage: '正解！',
      ngMessage: '答えが違うよ！',
      message: '',
      inputAnswer: '',
      sendMessage: '',
    }
  },
  template: `
    <p v-if="message === ngMessage" class="err-message">{{ message }}</p>
    <div class="answer__container">
      <div class="answer">
        <input type="chat" v-model="inputAnswer2" placeholder="答えを入力してね">
      </div>
      <button v-on:click="judgement(inputAnswer2)">送信</button>
    </div>`,
  methods: {
    judgement(answer) {
      if(answer === this.correct) { // 入力値が解答と一致する場合
        this.message = this.okMessage;
        this.$emit('answerInput', true);
      } else { // 一致しない場合
        this.message = '';
        this.message = this.ngMessage; 
        this.$emit('answerInput', false);
      }
    },
  }
})

/* 解答入力欄のコンポーネント 2問目以降 */
app.component('answer-input2', {
  props: ['correct'],
  data: function () {
    return {
      /* 送信ボタン上下に表示されるメッセージ */
      okMessage: '答えが違うよ！',
      ngMessage: '答えが違うよ！',
      message: '',
      inputAnswer: '',
      hintMessage:'ヒント',
      hintMessage2:'これがヒント',
    }
  },
  template: `
    <p v-if="message === ngMessage" class="err-message">{{ message }}</p>
    <div class="answer__container">
      <div class="answer">
        <input type="chat" v-model="inputAnswer2" placeholder="答えを入力してね">
      </div>
      <button v-on:click="judgement(inputAnswer2)">送信</button>
    </div>`,
  methods: {
    judgement(answer) {
      if(answer === this.correct) { // 入力値が解答と一致する場合
        this.$emit('answerInput', true);
      } else { // 一致しない場合
        this.message = '';
        this.message = this.ngMessage; 
        this.$emit('answerInput', false);
      }
    },
  }
})

app.mount('#stage')

$(function() {
  let tabs = $(".tab"); // tabのクラスを全て取得し、変数tabsに配列で定義
  $(".tab").on("click", function() { // tabをクリックしたらイベント発火
    $(".active").removeClass("active"); // activeクラスを消す
    $(this).addClass("active"); // クリックした箇所にactiveクラスを追加
    const index = tabs.index(this); // クリックした箇所がタブの何番目か判定し、定数indexとして定義
    $(".quiz").removeClass("show").eq(index).addClass("show"); // showクラスを消して、contentクラスのindex番目にshowクラスを追加
  })
})
