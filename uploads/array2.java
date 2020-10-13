import java.util.Scanner;
 
public class array2 
{
    public static void main (String[] args)
    {
        System.out.println("Enter the number of lines to display: ");
        Scanner sc = new Scanner (System.in);
        int n = sc.nextInt();
        System.out.println();
        int arr[][] = new int [n][];
 
        int count=1;
 
        for(int i=0;i<arr.length;i++){
             arr[i] = new int[i+1];
            for(int j=0;j<arr[i].length;j++){
                arr[i][j]=count++;
            }
        }
        for(int ii=0;ii<n;ii++){
            for(int jj=0;jj<ii+1;jj++){
                System.out.print(arr[ii][jj] + " ");
            }
            System.out.println();
        }
 
    }
}