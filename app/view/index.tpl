<html>
  <head>
    <title>Hacker News</title>
   <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>
  </head>
  <body>
    1234
     <div>{{data}}</div>
  </body>
</html>
<script>
  const data2 ="{{data}}"
  
  const obj = new Object(
    data2.replace(/(\&lt;)|(\&gt;)|(\&amp;)|(\&quot;)|(\x3C)/g,($)=>{
        return {
                            '&lt;':'<' ,
                            '&gt;':'>' ,
                            '&amp;':'&',
                            '&quot;':'"',
                            '\x3C':'<'
                        }[$];
        
    })
  ) 

</script>