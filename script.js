

$(document).ready(function(){

    let dataQuotes = [];

    // Show loading

    function loading(){
        $(".loader").show();
        $(".quote-container").hide()
    }

    function complete(){
        $(".loader").hide();
        $(".quote-container").show()
    }

    //loading();
    getQuote();

    $('#new-quote').click(newQuote);

    $('.twitter-button').click(function(){
        let quoteText = $("#quote").text();
        let author =  $("#author").text();
        tweetQuote(quoteText, author);
    })
    
    //show newQuote
    function newQuote(){
        loading();
        const quoteNum = Math.floor(Math.random() * Math.floor( dataQuotes.length));
        const quote = dataQuotes[quoteNum];
        //console.log(quote);

        $("#quote").text(quote.text) ;
        if( quote.author)
            $("#author").text('-' + quote.author) ;
        else $("#author").text('- Unknown') ;

        if(quote.text.length > 50){
            $('.quote-text').addClass('long-quote');
        }else  {
            $('.quote-text').removeClass('long-quote');
        }

        complete();
    }

   
    // Get Quote From API
    async function getQuote(){
        loading();
        
        const apiUrl = 'https://type.fit/api/quotes';

        try {
            const response = await fetch(apiUrl)
            dataQuotes =  await response.json();
            newQuote();
        
        }catch(error){
            console.log('Whoops, no quote', error)
        }
    }
});

//tweet Quote

function tweetQuote(quoteText, author){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${author}`;
    window.open(twitterUrl, '_blank');
}


