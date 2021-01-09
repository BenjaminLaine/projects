/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memset.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/16 18:02:51 by blaine            #+#    #+#             */
/*   Updated: 2019/11/05 23:55:19 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "./includes/libft.h"

void	*ft_memset(void *dest, int c, size_t len)
{
	int i;

	i = 0;
	while (len > 0)
	{
		*((unsigned char*)dest + i) = (unsigned char)c;
		i++;
		len--;
	}
	return (dest);
}
